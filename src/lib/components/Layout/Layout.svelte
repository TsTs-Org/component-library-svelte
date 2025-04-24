<script lang="ts">
	import type { Snippet } from "svelte";

    type Props = {
        leftSidebar?: Snippet;
        // rightSidebar?: Snippet;
        topnav?: Snippet;
        // bottomnav?: Snippet;
        // rightnav?: Snippet;
        // leftnav?: Snippet;
		children?: Snippet;
	};

	let {
        leftSidebar,
        // rightSidebar,
        topnav,
        // bottomnav,
        // rightnav,
        // leftnav,
		children,
		...restProps
	}: Props = $props();

</script>

<div class="Layout" {...restProps}>
    <div class="nav" style="grid-area: topnav">
        {@render topnav?.()}
    </div>

    <div style="grid-area: leftSidebar">
        {@render leftSidebar?.()}
    </div>
    
    <div class="Content" style="grid-area: content">
        {@render children?.()}
    </div>
    
</div>

<style lang="scss">
    .Layout{
        height: 100dvh;
        width: 100%;
        overflow: hidden;
        display: grid;
        grid-template-areas: 
            "topnav topnav topnav"
            "leftSidebar content rightSidebar"
            "leftSidebar content rightSidebar";
        grid-template-columns: min-content auto 0px;
        grid-template-rows: min-content auto auto;
    }
    .Content {
        overflow: auto;
    }
</style>