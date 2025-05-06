<script>
	// Assume items is an array of your 120 items.
	// For testing purposes, you can create a dummy array:
	// let items = $state(Array.from({ length: 120 }, (_, i) => ({ id: i, data: `Item ${i}` })));
	let {
		items,
		thead,
		trow,
		tfoot,
		rowHeight = 40,
		start = $bindable(0),
		end = $bindable(10),
		// ...props
	} = $props();

	console.log('LENGTH: ', items.length);

	// Virtualization state variables.
	// start and end determine which items are visible.
	// let start = 0;
	// let end = 10; // initial visible count
	let viewport = $state(null); // will hold a reference to the scroll container (the <svelte-virtual-table-viewport>)
	// let viewportHeight = 0;
	// Keep separate state variables like before, but use $state for reactivity
	let viewportHeight = $state(0);

	let scrollOffset = $state(0); //TODO: DELETE THIS LINE?

	// Derived computed visible items.
	// In Svelte, this reactive statement will update whenever start or end changes.
	const visible = $derived(items.slice(start, end));

	// Calculate visibleCount based on the viewport height.
	const visibleCount = $derived(Math.ceil(viewportHeight / rowHeight));

	// When the viewportHeight or visibleCount changes, update end if needed.
	// Update end when start or visibleCount changes
	$effect(() => {
		console.log('Enter effect');
		if (start + visibleCount !== end) {
			console.log('IN IF');
			end = Math.min(start + visibleCount, items.length);
		}
		console.log('Exit effect');
	});

	// $effect(() => {
	// 	const currentStart = start;
	// 	const currentVisibleCount = visibleCount;
	// 	const currentEnd = end; // Current value of end before potential update

	// 	// For debugging, let's see the values before the condition:
	// 	console.log(
	// 		`Updating 'end': start=<span class="math-inline">\{currentStart\}, visibleCount\=</span>{currentVisibleCount}, currentEnd=${currentEnd}`
	// 	);

	// 	if (currentStart + currentVisibleCount !== currentEnd) {
	// 		const newEnd = Math.min(currentStart + currentVisibleCount, items.length);
	// 		console.log(
	// 			`Condition met: currentEnd (<span class="math-inline">\{currentEnd\}\) \!\=\= calculated \(</span>{currentStart + currentVisibleCount}). Setting end to ${newEnd}`
	// 		);
	// 		end = newEnd;
	// 	} else {
	// 		console.log(
	// 			`Condition NOT met: currentEnd (<span class="math-inline">\{currentEnd\}\) \=\=\= calculated \(</span>{currentStart + currentVisibleCount}). 'end' not changed.`
	// 		);
	// 	}
	// });

	$effect(() => {
		console.log('Visible:', visible);
		console.log('Visible Count:', visibleCount);
		console.log('viewportHeight:', viewportHeight);
	});

	// Scroll handler calculates new start/end based on current scroll.
	function handleScroll() {
		// if (!viewport) return; // Guard if viewport isn't bound yet
		console.log('HandleScroll Enter');
		const scrollTop = viewport.scrollTop;
		// Calculate new start index. (Floor the scrollTop divided by rowHeight.)
		const newStart = Math.floor(scrollTop / rowHeight);
		// Calculate new end index, ensuring we don't exceed items.length.
		const newEnd = Math.min(newStart + visibleCount, items.length);
		// Instead of using Math.floor alone, store the fractional remainder
		const remainder = scrollTop - newStart * rowHeight;

		console.log('HandleScroll: scrollTop=', scrollTop, 'newStart=', newStart, 'newEnd=', newEnd);

		// Update reactive variables
		start = newStart;
		end = newEnd;
		scrollOffset = remainder;
		console.log('HandleScroll EXIT');
	}
</script>

<svelte-virtual-table-viewport
	bind:this={viewport}
	onscroll={handleScroll}
	bind:offsetHeight={viewportHeight}
>
	<table class="table">
		{@render thead?.()}

		<tbody class="tbody" style="transform: translateY(-{scrollOffset}px);">
			{#if start > 0}
				<!-- The top spacer: its height is calculated as the total height for the hidden items -->
				<tr class="top">
					<td colspan="5" class="spacer-cell">
						<div style="height: {start * rowHeight}px;"></div>
					</td>
				</tr>
			{/if}

			{#each visible as item, index}
				<!-- Render each visible data row; ensure each row's height is exactly rowHeight -->
				{@render trow(item, index, rowHeight)}
			{/each}

			{#if end < items.length}
				<!-- The bottom spacer: calculates the height for all the items after the visible ones -->
				<tr class="bottom">
					<td colspan="5" class="spacer-cell">
						<div style="height: {(items.length - end) * rowHeight}px;"></div>
					</td>
				</tr>
			{/if}
		</tbody>

		{@render tfoot?.()}
	</table>
</svelte-virtual-table-viewport>

<style>
	/* Global reset */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}
	/* Define the scroll container with an explicit height from the wrapper. */
	svelte-virtual-table-viewport {
		display: block;
		height: 100%;
		overflow-y: auto;
		border: 1px solid #ccc;
		margin: 0;
	}
	/* Basic table styling */
	table {
		width: 100%;
		border-collapse: collapse;
		table-layout: fixed;
	}
	thead {
		background: #f5f5f5;
		height: 40px;
	}
	thead th {
		height: 40px;
		line-height: 40px;
		padding: 0 8px;
		font-size: 14px;
		border: 1px solid #ccc;
		text-align: left;
	}
	tbody tr {
		/* Data rows will explicitly have a fixed height */
		height: 40px;
	}
	th,
	td {
		border: 1px solid #ccc;
		padding: 8px;
		text-align: left;
	}
	/* Spacer cells, minimal styling, letting the inner <div> set the correct height. */
	.spacer-cell {
		padding: 0;
		margin: 0;
	}
</style>
