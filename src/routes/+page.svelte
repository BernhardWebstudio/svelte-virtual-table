<script>
	export const ssr = false;
	import VirtualTable from '../lib/index';
	// import VirtualTable from 'svelte-virtual-table'

	let items = $state([]);
	async function getData() {
		let dataItems = [];
		for (let page = 1; page < 5; page++) {
			let res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
			let data = await res.json();
			dataItems = dataItems.concat(data);
		}
		items = dataItems;
		return items;
	}

	const dataPromise = getData();

	let searchTerm = $state('');

	let filteredList = $derived(
		items.filter((item) => item.title.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1)
	);

	let start = $state(0),
		start2 = $state(0);
	let end = $state(10),
		end2 = $state(10);
</script>

<h1>Virtual Table Test</h1>

<p>
	This is an example-project for the Svelte Virtual (Sortable) Table component. Checkout the source
	on <a href="https://github.com/BernhardWebstudio/svelte-virtual-table">GitHub</a>. The table's
	example content is loaded from HackerNews — all rights reserved. The author has no association
	with Svelte or Hacker News and is not liable and/or otherwise responsible for any of the contents
	in these tables.
</p>

Filter:
<input bind:value={searchTerm} />

{#await dataPromise}
	Loading...
{:then}
	<p>Loaded {filteredList.length} items.</p>
	<h3>Without border-collapse:</h3>
	<p>Start: {start}, end: {end}</p>
	<VirtualTable items={filteredList} className="test1 test2" bind:start bind:end>
		{#snippet thead()}
			<tr>
				<th data-sort="title">Title</th>
				<th data-sort="user">User</th>
				<th data-sort="domain">Domain</th>
				<th data-sort="time" data-sort-initial="descending">Time ago</th>
				<th data-sort="comments_count">Comments</th>
			</tr>
		{/snippet}
		{#snippet trow(item, index)}
			<tr class="tr">
				<td class="td"><a href={item.url} target="_blank">{item.title}</a></td>
				<td class="td">{item.user}</td>
				<td class="td">{item.domain}</td>
				<td class="td">{item.time_ago}</td>
				<td class="td">{item.comments_count}</td>
			</tr>
		{/snippet}
	</VirtualTable>

	<h3>With border-collapse:</h3>
	<p>Start: {start2}, end: {end2}</p>
	<VirtualTable
		items={filteredList}
		class="test1 test2"
		requireBorderCollapse="true"
		bind:start={start2}
		bind:end={end2}
	>
		{#snippet thead()}
			<tr>
				<th data-sort="title">Title</th>
				<th data-sort="user">User</th>
				<th data-sort="domain">Domain</th>
				<th data-sort="time" data-sort-initial="descending">Time ago</th>
				<th data-sort="comments_count">Comments</th>
			</tr>
		{/snippet}
		{#snippet trow(item)}
			<tr class="tr">
				<td class="td"><a href={item.url} target="_blank">{item.title}</a></td>
				<td class="td">{item.user}</td>
				<td class="td">{item.domain}</td>
				<td class="td">{item.time_ago}</td>
				<td class="td">{item.comments_count}</td>
			</tr>
		{/snippet}
	</VirtualTable>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<p>
	Thanks for checking out this Demo. Refer to the <a
		href="https://github.com/BernhardWebstudio/svelte-virtual-table#readme">README</a
	>
	of the original project on how to use this component and the
	<a href="https://github.com/BernhardWebstudio/svelte-virtual-table/issues">GitHub-project</a> in general
	for known issues.
</p>

<style>
	:global(body) {
		background-color: white;
	}

	:global(table) {
		min-height: min(10rem, 50vh);
	}

	:global(.test1) {
		width: 100%;
		border: 1px solid black;
	}

	:global(.test1 thead) {
		text-align: left;
		border-bottom: 10px solid black;
	}

	/**
  * This border is only visible when 
  */
	:global(.test1 tr) {
		border-bottom: 10px solid grey;
		border-top: 10px solid grey;
	}

	:global(.test1 td:not(:last-of-type)) {
		border-right: 1px solid grey;
	}
	:global(.test1 th:not(:last-of-type)) {
		border-right: 1px solid grey;
	}

	/**
  * Specify fixed widths
  */
	.td:first-of-type,
	td:first-of-type,
	:global(.test1 th:first-of-type) {
		width: 45vw;
	}

	td,
	.td,
	:global(.test1 th) {
		width: calc((45vw - 10px) / 4);
		word-wrap: break-word;
	}

	:global(.test1 th:last-of-type),
	.td:last-of-type,
	td:last-of-type {
		text-align: right;
	}
</style>
