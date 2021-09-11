# Svelte: Virtual Table

## Inspiration & Compatibility

-   https://svelte.dev/repl/a138b0c8579b4fc8bdde842a9d922b1f?version=3.17.1
-   https://github.com/mattiash/svelte-tablesort
-   https://github.com/sveltejs/svelte-virtual-list

## Issues

Currently, when scrolling down, it can happen that the table continues scrolling without user intervention (though the scrolling can be stopped manually).
This is not the case when scrolling up. 

The reasoning is probably related to the facts, that:
- scrollTop increases with the --p-top
- changing --p-top and --p-bottom triggers a scroll event
- scrolling up is not affected
- unstopped scrolling starts after removing an item from viewport

~That scrolling up is not affected is probably related to browser's behaviour regarding the origin of the scrolling (adding/removing elements below is not )~
