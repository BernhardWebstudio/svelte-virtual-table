# Svelte: Virtual Table

A sortable, virtual table for Svelte.

- [Svelte: Virtual Table](#svelte-virtual-table)
  - [Installation](#installation)
  - [Useage](#useage)
  - [Styling](#styling)
  - [Development Notes](#development-notes)
  - [Inspiration & Compatibility](#inspiration--compatibility)

## Installation

Install this component using

```bash
yarn install svelte-virtual-table
```

or

```bash
npm install svelte-virtual-table
```

, respectively.

## Useage

You can then, after the installation, import it in your app:

```js
import VirtualTable from 'svelte-virtual-table'
```

and use it, for example like so:

```js
let myItemsArray = []

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

// TWO variables that can be bound to the VirtualTable
let start // the index of the first visible item
let end // the index of the last visible item
```

```svelte
{#await dataPromise}
    Loading...
{:then}
    <VirtualTable
        items={myItemsArray}
        class="anyClassIWantToAdd"
        bind:start
        bind:end
    >
        <tr slot="thead">
            <th data-sort="title">Title</th>
            <th data-sort="user">User</th>
            <th data-sort="domain">Domain</th>
            <th data-sort="time" data-sort-initial="descending">Time ago</th>
            <th data-sort="comments_count">Comments</th>
        </tr>
        <tr slot="tbody" let:item>
            <td>
                <a href={item.url} target="_blank">{item.title}</a>
            </td>
            <td>{item.user}</td>
            <td>{item.domain}</td>
            <td>{item.time_ago}</td>
            <td>{item.comments_count}</td>
        </tr>
    </VirtualTable>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
```

You can find an example-app in the [GitHub Repo](https://github.com/BernhardWebstudio/svelte-virtual-table/tree/main/example-app).

## Styling

As written in the [Development Notes](#development-notes), table and tbody are unfortunately currently required to have `display: block` set (please, feel free to open a PR with a better implementation).

One other thing that has to be considered: as the table might not have loaded all rows, the width of the rows might be different, depending on which rows are currently displayed. That is why `table-layout: fixed` is used.

Make sure to assign widths to your table cells (see the example-app for a possible solution).

## Development Notes

One of the objectives was to use native HTML `<table>`, `<thead>`, `<tbody>` etc.
As these are not block-type elements, the original intention to use padding as a means to indicate the table's "scrollability" of the inner table is not possible.

There are two workarounds:
either apply a border, or use `::before`- and `::after`-pseudo elements.

The latter could work e.g. like this:

```css
tbody::before {
    box-sizing: border-box;
    content: ' ';
    display: block;
    height: var(--p-top);
}
tbody::after {
    box-sizing: border-box;
    content: ' ';
    display: block;
    height: var(--p-bottom);
}
```

Unfortunately, with these two workarounds, when scrolling down, it can happen that the table continues scrolling without user intervention (though the scrolling can be stopped manually).
This is not the case when scrolling up.

Some observations related to this observation:

-   scrollTop increases with the --p-top
-   changing --p-top and --p-bottom triggers a scroll event
-   scrolling up is not affected
-   unstopped scrolling starts after removing an item from viewport

In any case, as no workaround for the issues of these workarounds has been found, finally, currently, the table and tbody have `display` set to `block` and the padding is used for the scroll length.

## Inspiration & Compatibility

-   https://svelte.dev/repl/a138b0c8579b4fc8bdde842a9d922b1f?version=3.17.1
-   https://github.com/mattiash/svelte-tablesort
-   https://github.com/sveltejs/svelte-virtual-list
