<script>
    // NOTE: replace the following line:
    import VirtualTable from '../../src/VirtualTable.svelte'
    // with:
    // import VirtualTable from 'svelte-virtual-table'
    // after installing the component using yarn/npm in your own project
    let items = []
    async function getData() {
        let dataItems = []
        for (let page = 1; page < 5; page++) {
            let res = await fetch(
                `https://node-hnapi.herokuapp.com/news?page=${page}`
            )
            let data = await res.json()
            dataItems = dataItems.concat(data)
        }
        items = dataItems
        return items
    }

    const dataPromise = getData()

    let searchTerm = ''

    $: filteredList = items.filter(
        (item) =>
            item.title.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1
    )

    let start
    let end
</script>

<h1>Virtual Table Test</h1>

Filter:
<input bind:value={searchTerm} />

<p>Start: {start}, end: {end}</p>

{#await dataPromise}
    Loading...
{:then}
    <VirtualTable items={filteredList} class="test1 test2" bind:start bind:end>
        <!-- <tr slot="thead">
            <th data-sort="title">Title</th>
            <th data-sort="user">User</th>
            <th data-sort="domain">Domain</th>
            <th data-sort="time" data-sort-initial="descending">Time ago</th>
            <th data-sort="comments_count">Comments</th>
        </tr> -->
        <tr slot="tbody" let:item>
            <td><a href={item.url} target="_blank">{item.title}</a></td>
            <td>{item.user}</td>
            <td>{item.domain}</td>
            <td>{item.time_ago}</td>
            <td>{item.comments_count}</td>
        </tr>
    </VirtualTable>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<p>Start: {start}, end: {end}</p>

<style>
    :global(body) {
        background-color: white;
    }

    :global(.test1) {
        border: 1px solid black;
        table-layout: fixed;
    }

    :global(.test1 th) {
        text-align: left;
        border-bottom: 1px solid black;
    }

    td:first-of-type, :global(.test1 th:first-of-type) {
        width: 50vw;
    }

    td, :global(.test1 th) {
        width: calc((50vw-4px) / 4);
    }

    td:last-of-type {
        text-align: right;
    }
</style>
