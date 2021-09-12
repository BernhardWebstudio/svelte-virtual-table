<script>
    const CLASSNAME_TABLE = 'tablesort' // keep same for compatibility with https://github.com/mattiash/svelte-tablesort
    const CLASSNAME_SORTABLE = 'sortable'
    const CLASSNAME_ASC = 'ascending'
    const CLASSNAME_DESC = 'descending'

    import {
        compareNumbers,
        compareStrings,
        sortFunction,
    } from 'generator-sort'
    import { onMount, tick } from 'svelte'

    // props
    export let items
    export let requireBorderCollapse = false
    let className = ''
    export { className as class }

    // MARK: virtual stuff
    export let height = '100%'
    export let itemHeight = undefined

    // read-only, but visible to consumers via bind:start resp. bind:end
    export let start = 0 // the index of the first visible item
    export let end = 0 // the index of the last visible item

    // local state
    let average_height
    let bottom = 0
    let contents
    let head_height = 0
    let foot_height = 0
    let height_map = []
    let mounted
    let rows
    let thead
    let top = 0
    let viewport
    let viewport_height = 0
    let visible

    let itemLength
    let oldItemsLength = items.length

    $: itemLength = items.length
    // whenever `items` changes, invalidate the current heightmap
    $: if (mounted) refreshHeightMap(sortedItems, viewport_height, itemHeight)

    async function refreshHeightMap(items, viewport_height, itemHeight) {
        const { scrollTop } = viewport
        await tick() // wait until the DOM is up to date
        let content_height = top - (scrollTop - head_height)
        let i = start
        while (
            content_height < viewport_height - head_height &&
            i < items.length
        ) {
            let row = rows[i - start]
            if (!row) {
                end = i + 1
                await tick() // render the newly visible row
                row = rows[i - start]
            }
            const row_height = (height_map[i] = itemHeight || row.offsetHeight)
            content_height += row_height
            i += 1
        }
        end = i
        const remaining = items.length - end
        average_height = (top + content_height) / end
        bottom = remaining * average_height + foot_height
        height_map.length = items.length
        await scrollToIndex(0, { behavior: 'auto' })
    }

    async function handleScroll() {
        rows = contents.children
        const isStartOverflow = items.length < start
        const head_height_to_respect = requireBorderCollapse ? 0 : head_height

        if (isStartOverflow) {
            console.log('Start overflow')
            await scrollToIndex(items.length - 1, { behavior: 'auto' })
        }

        const { scrollTop } = viewport
        const old_start = start
        let new_start = 0
        // acquire height map for currently visible rows
        for (let v = 0; v < rows.length; v += 1) {
            height_map[start + v] = itemHeight || rows[v].offsetHeight
        }
        let i = 0
        let y = 0
        // loop items to find new start
        while (i < items.length) {
            const row_height = height_map[i] || average_height
            if (y + row_height + head_height_to_respect > scrollTop) {
                new_start = i
                top = y // + row_height
                break
            }
            y += row_height
            i += 1
        }
        new_start = Math.max(0, new_start)
        console.log(
            'a',
            i,
            y,
            top,
            bottom,
            scrollTop,
            head_height_to_respect,
            average_height
        )
        // loop items to find end
        while (i < items.length) {
            y += height_map[i] || average_height
            i += 1
            if (y > scrollTop + viewport_height - head_height_to_respect) {
                break
            }
        }
        start = new_start
        end = i
        const remaining = items.length - end
        if (end === 0) {
            end = 10;
        }
        average_height = y / end
        let remaining_height = remaining * average_height // 0
        // compute height map for remaining items
        while (i < items.length) {
            i += 1
            height_map[i] = height_map[i] || average_height
            // remaining_height += height_map[i] / remaining
        }
        // find the
        bottom = remaining_height
        if (!isFinite(bottom)) {
            bottom = 200000
        }

        console.log(
            'b',
            i,
            y,
            top,
            bottom,
            scrollTop,
            head_height,
            average_height
        )
    }

    export async function scrollToIndex(index, opts) {
        const { scrollTop } = viewport
        const itemsDelta = index - start
        const _itemHeight = itemHeight || average_height
        const distance = itemsDelta * _itemHeight
        opts = {
            left: 0,
            top: scrollTop + distance,
            behavior: 'smooth',
            ...opts,
        }
        viewport.scrollTo(opts)
    }

    // MARK: table sort stuff
    // let thead
    let sortOrder = [[]]

    $: sortedItems = sorted([...items], sortOrder)

    $: visible = sortedItems
        .slice(Math.max(0, start - 5), Math.min(sortedItems.length, end + 3)) // start, end) // 
        .map((data, i) => {
            return { index: i + start, data }
        })

    const sorted = function (arr, sortOrder) {
        arr.sort(
            sortFunction(function* (a, b) {
                for (let [fieldName, r] of sortOrder) {
                    const reverse = r === 0 ? 1 : -1
                    if (typeof a[fieldName] === 'number') {
                        yield reverse *
                            compareNumbers(a[fieldName], b[fieldName])
                    } else {
                        yield reverse *
                            compareStrings(a[fieldName], b[fieldName])
                    }
                }
            })
        )

        return arr
    }

    function updateSortOrder(th, push) {
        const fieldName = th.dataset.sort
        if (push) {
            if (sortOrder[sortOrder.length - 1][0] === fieldName) {
                sortOrder[sortOrder.length - 1] = [
                    fieldName,
                    (sortOrder[sortOrder.length - 1][1] + 1) % 2,
                ]
            } else {
                sortOrder = [...sortOrder, [fieldName, 0]]
            }
        } else {
            if (sortOrder.length === 1 && sortOrder[0][0] === fieldName) {
                sortOrder[0] = [fieldName, (sortOrder[0][1] + 1) % 2]
            } else {
                resetClasses()
                sortOrder = [[fieldName, 0]]
            }
        }
        th.className =
            CLASSNAME_SORTABLE +
            ' ' +
            (sortOrder[sortOrder.length - 1][1]
                ? CLASSNAME_DESC
                : CLASSNAME_ASC)
    }

    function resetClasses() {
        const th = thead.getElementsByTagName('th')
        for (let i = 0; i < th.length; i++) {
            if (th[i].dataset.sort) {
                th[i].className = CLASSNAME_SORTABLE
            }
        }
    }

    // MARK: initial triggers
    onMount(() => {
        // triggger initial refresh for virtual
        rows = contents.children
        mounted = true
        refreshHeightMap(items, viewport_height, itemHeight)

        // prepare sorting
        const th = thead.getElementsByTagName('th')
        for (let i = 0; i < th.length; i++) {
            if (th[i].dataset.sort) {
                th[i].className = CLASSNAME_SORTABLE
                th[i].onclick = (event) =>
                    updateSortOrder(th[i], event.shiftKey)
            }
            if (th[i].dataset.sortInitial === 'descending') {
                th[i].className = CLASSNAME_SORTABLE + ' ' + CLASSNAME_DESC
                sortOrder = [...sortOrder, [th[i].dataset.sort, 1]]
            } else if (th[i].dataset.sortInitial != undefined) {
                th[i].className = CLASSNAME_SORTABLE + ' ' + CLASSNAME_ASC
                sortOrder = [...sortOrder, [th[i].dataset.sort, 0]]
            }
        }
    })
</script>

<p class="debug">
    Debug: {viewport_height}, {average_height}, {height}, {top}, {bottom}
</p>

<svelte-virtual-table-viewport>
    <table
        class:require-border-collapse={requireBorderCollapse}
        class="{CLASSNAME_TABLE}
        {className} table"
        bind:this={viewport}
        bind:offsetHeight={viewport_height}
        on:scroll={handleScroll}
        style="height: {height}; --p-top: {top}px; --p-bottom: {bottom}px; --head-height: {head_height}px; --foot-height: {foot_height}px"
    >
        <thead class="thead" bind:this={thead} bind:offsetHeight={head_height}>
            <slot name="thead" />
        </thead>
        <tbody
            style="--p-top: {top}px; --p-bottom: {bottom}px;"
            bind:this={contents}
            class="tbody"
        >
            {#each visible as item}
                <slot name="tbody" item={item.data} index={item.index}>
                    Missing Table Row
                </slot>
            {/each}
        </tbody>
        <tfoot class="tfoot" bind:offsetHeight={foot_height}>
            <slot name="tfoot" />
        </tfoot>
    </table>
</svelte-virtual-table-viewport>

<style type="text/css">
    .debug {
        display: block;
    }
    .container {
        max-height: 100vh;
    }
    table,
    .table {
        position: relative;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        max-height: 100vh;
        box-sizing: border-box;
        /* table-layout: fixed; */
    }
    table:not(.require-border-collapse) {
        display: block;
    }
    table:not(.require-border-collapse) :is(thead, tfoot, tbody) {
        display: table;
        table-layout: fixed;
        width: 100%;
    }
    table.require-border-collapse thead {
        padding-top: var(--p-top);
    }
    table.require-border-collapse tfoot {
        padding-bottom: var(--p-bottom);
    }
    table.require-border-collapse {
        border-collapse: collapse;
    }
    table:not(.require-border-collapse) tbody {
        padding-top: var(--p-top);
        padding-bottom: var(--p-bottom);
    }
    tbody {
        position: relative;
        box-sizing: border-box;
        border: 0px solid currentColor;
    }

    /** sortable styles */
    thead :global(th.sortable),
    .thead :global(.th.sortable) {
        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
    }
</style>
