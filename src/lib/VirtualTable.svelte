<script>
	export const ssr = false;

	const CLASSNAME_TABLE = 'tablesort'; // keep same for compatibility with https://github.com/mattiash/svelte-tablesort
	const CLASSNAME_SORTABLE = 'sortable';
	const CLASSNAME_ASC = 'ascending';
	const CLASSNAME_DESC = 'descending';

	import { onMount, tick } from 'svelte';

	// props
	let {
		items,
		requireBorderCollapse = false,
		className = '',
		height = '100%',
		itemHeight = undefined,
		start = $bindable(),
		end = $bindable(),
		trow,
		tfoot,
		thead
	} = $props();

	// local state
	let averageHeight = $state();
	let bottom = $state(0);
	let contents = $state();
	let headHeight = $state(0);
	let footHeight = $state(0);
	let heightMap = $state([]);
	let mounted = $state();
	let rows = $state();
	let theadElement = $state();
	let top = $state(0);
	let viewport = $state();
	let viewportHeight = $state(0);

	// derived state
	let sortedItems = $derived.by(() => {
		console.log('Deriving sorted items');
		return sorted([...items], sortOrder);
	});

	let visible = $derived.by(() => {
		console.log('Deriving visible items', [start, end]);
		return sortedItems.slice(start, end).map((data, i) => {
			return { index: i + start, data: data };
		});
	});

	// whenever `items` changes, invalidate the current heightmap
	$effect(() => {
		if (items && mounted) {
			console.log('Refreshing height map for ' + items.length + ' items');
			refreshHeightMap(items, viewportHeight, itemHeight);
		}
	});

	async function refreshHeightMap(items, viewportHeight, itemHeight) {
		const { scrollTop } = viewport;
		await tick(); // wait until the DOM is up to date
		let contentHeight = top - (scrollTop - headHeight);
		let i = start;
		while (contentHeight < viewportHeight - headHeight && i < items.length) {
			let row = rows[i - start];
			if (!row) {
				end = i + 1;
				await tick(); // render the newly visible row
				row = rows[i - start];
			}
			const row_height = (heightMap[i] = itemHeight || row.getBoundingClientRect().height);
			contentHeight += row_height;
			i += 1;
		}
		end = i;
		const remaining = items.length - end;
		averageHeight = (top + contentHeight) / end;
		bottom = remaining * averageHeight + footHeight;
		heightMap.length = items.length;
		await scrollToIndex(0, { behavior: 'auto' });
	}

	function getComputedPxAmount(elem, pseudoElem, property) {
		const compStyle = getComputedStyle(elem, pseudoElem);
		return parseInt(compStyle[property]);
	}

	async function handleScroll() {
		rows = contents.children;
		const isStartOverflow = sortedItems.length < start;
		const rowBottomBorder = getComputedPxAmount(rows[1], null, 'border-bottom-width');
		const rowTopBorder = getComputedPxAmount(rows[1], null, 'border-top-width');
		const headBorderTop = getComputedPxAmount(theadElement, null, 'border-top-width');
		const headBorderBottom = getComputedPxAmount(theadElement, null, 'border-bottom-width');
		const actualBorderCollapsedWidth = requireBorderCollapse
			? Math.max(rowBottomBorder, rowTopBorder)
			: 0;

		if (isStartOverflow) {
			await scrollToIndex(sortedItems.length - 1, { behavior: 'auto' });
		}

		const { scrollTop } = viewport;
		let new_start = 0;
		// acquire height map for currently visible rows
		for (let v = 0; v < rows.length; v += 1) {
			heightMap[start + v] = itemHeight || rows[v].getBoundingClientRect().height;
		}
		let i = 0;
		// start from top: thead, with its borders, plus the first border to afterwards neglect
		let y = headHeight + rowTopBorder / 2;
		let row_heights = [];
		// loop items to find new start
		while (i < sortedItems.length) {
			const row_height = heightMap[i] || averageHeight;
			row_heights[i] = row_height;
			// we only want to jump if the full (incl. border) row is away
			if (y + row_height + actualBorderCollapsedWidth > scrollTop) {
				// this is the last index still inside the viewport
				new_start = i;
				top =
					y -
					(requireBorderCollapse
						? (headBorderBottom + headBorderTop) / 2
						: headHeight + rowTopBorder / 2); //+ rowBottomBorder - rowTopBorder
				break;
			}
			y += row_height;
			i += 1;
		}

		// console.log(
		//     'a',
		//     i,
		//     y,
		//     top,
		//     bottom,
		//     scrollTop,
		//     headHeight,
		//     averageHeight,
		//     actualBorderCollapsedWidth,
		//     row_heights,
		//     heightMap
		// )
		new_start = Math.max(0, new_start);
		// loop items to find end
		while (i < sortedItems.length) {
			const row_height = heightMap[i] || averageHeight;
			y += row_height;
			i += 1;
			if (y > scrollTop + viewportHeight) {
				break;
			}
		}
		start = new_start;
		end = i;
		const remaining = sortedItems.length - end;
		if (end - start < 5) {
			end = Math.min(start + 5, sortedItems.length - 1);
		}
		averageHeight = y / end;
		let remaining_height = remaining * averageHeight; // 0
		// compute height map for remaining items
		while (i < sortedItems.length) {
			i += 1;
			heightMap[i] = averageHeight;
			// remaining_height += heightMap[i] / remaining
		}
		// find the
		bottom = remaining_height;
		if (!isFinite(bottom)) {
			bottom = 200000;
		}
	}

	export async function scrollToIndex(index, opts) {
		const { scrollTop } = viewport;
		const itemsDelta = index - start;
		const _itemHeight = itemHeight || averageHeight;
		const distance = itemsDelta * _itemHeight;
		opts = {
			left: 0,
			top: scrollTop + distance,
			behavior: 'smooth',
			...opts
		};
		viewport.scrollTo(opts);
	}

	// MARK: table sort stuff
	let sortOrder = [[]];

	const sorted = (arr, sortOrder) => {
		arr.sort((a, b) => {
			for (let [fieldName, r] of sortOrder) {
				const reverse = r === 0 ? 1 : -1;
				if (fieldName in b && !(fieldName in a)) {
					return -1 * reverse;
				}
				if (!(fieldName in b) && fieldName in a) {
					return 1 * reverse;
				}
				let comparison = 0;
				if (typeof a[fieldName] === 'string') {
					comparison = reverse * a[fieldName].localeCompare(b[fieldName]);
				} else if (a[fieldName] != b[fieldName]) {
					comparison = reverse * (a[fieldName] > b[fieldName] ? 1 : -1);
				}
				if (comparison) {
					return comparison;
				}
			}
			return 0;
		});

		return arr;
	};

	function updateSortOrder(th, push) {
		const fieldName = th.dataset.sort;
		console.log('updateSortOrder', fieldName, push, sortOrder);
		if (push) {
			if (sortOrder[sortOrder.length - 1][0] === fieldName) {
				sortOrder[sortOrder.length - 1] = [fieldName, (sortOrder[sortOrder.length - 1][1] + 1) % 2];
			} else {
				sortOrder = [...sortOrder, [fieldName, 0]];
			}
		} else {
			if (sortOrder.length === 1 && sortOrder[0][0] === fieldName) {
				sortOrder[0] = [fieldName, (sortOrder[0][1] + 1) % 2];
			} else {
				resetClasses();
				sortOrder = [[fieldName, 0]];
			}
		}
		th.className =
			CLASSNAME_SORTABLE +
			' ' +
			(sortOrder[sortOrder.length - 1][1] ? CLASSNAME_DESC : CLASSNAME_ASC);
	}

	function resetClasses() {
		const th = theadElement.getElementsByTagName('th');
		for (let i = 0; i < th.length; i++) {
			if (th[i].dataset.sort) {
				th[i].className = CLASSNAME_SORTABLE;
			}
		}
	}

	// MARK: initial triggers
	onMount(() => {
		// triggger initial refresh for virtual
		rows = contents.children;
		mounted = true;
		refreshHeightMap(items, viewportHeight, itemHeight);

		// prepare sorting
		const th = theadElement.getElementsByTagName('th');
		for (let i = 0; i < th.length; i++) {
			if (th[i].dataset.sort) {
				th[i].className = CLASSNAME_SORTABLE;
				th[i].onclick = (event) => updateSortOrder(th[i], event.shiftKey);
			}
			if (th[i].dataset.sortInitial === 'descending') {
				th[i].className = CLASSNAME_SORTABLE + ' ' + CLASSNAME_DESC;
				sortOrder = [...sortOrder, [th[i].dataset.sort, 1]];
			} else if (th[i].dataset.sortInitial != undefined) {
				th[i].className = CLASSNAME_SORTABLE + ' ' + CLASSNAME_ASC;
				sortOrder = [...sortOrder, [th[i].dataset.sort, 0]];
			}
		}
	});
</script>

<svelte-virtual-table-viewport>
	<table
		class:require-border-collapse={requireBorderCollapse}
		class="{CLASSNAME_TABLE}
        {className} table"
		bind:this={viewport}
		bind:offsetHeight={viewportHeight}
		onscroll={handleScroll}
		role="table"
		style="height: {height}; --bw-svt-p-top: {top}px; --bw-svt-p-bottom: {bottom}px; --bw-svt-head-height: {headHeight}px; --bw-svt-foot-height: {footHeight}px; --bw-svt-avg-row-height: {averageHeight}px"
	>
		<thead class="thead" bind:this={theadElement} bind:offsetHeight={headHeight} role="rowheader">
			{@render thead?.()}
		</thead>
		<tbody bind:this={contents} class="tbody" role="rowgroup">
			{#each visible as item, i}
				{@render trow?.(item.data, item.index, i)}
			{/each}
		</tbody>
		<tfoot class="tfoot" bind:offsetHeight={footHeight} role="rowgroup">
			{@render tfoot?.()}
		</tfoot>
	</table>
</svelte-virtual-table-viewport>

<style type="text/css">
	table {
		position: relative;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		max-height: 100vh;
		box-sizing: border-box;
		display: block;
		/* table-layout: fixed; */
	}
	table :is(thead, tfoot, tbody) {
		display: table;
		table-layout: fixed;
		width: 100%;
		box-sizing: border-box;
	}
	table.require-border-collapse thead {
		min-height: calc(var(--bw-svt-p-top));
	}
	table.require-border-collapse tfoot {
		min-height: calc(var(--bw-svt-p-bottom));
	}
	table.require-border-collapse {
		border-collapse: collapse;
	}
	table:not(.require-border-collapse) tbody {
		padding-top: var(--bw-svt-p-top);
		padding-bottom: var(--bw-svt-p-bottom);
	}
	tbody {
		position: relative;
		box-sizing: border-box;
		border: 0px solid currentColor;
	}

	/** sortable styles */
	thead :global(th.sortable) {
		cursor: pointer;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
	}
</style>
