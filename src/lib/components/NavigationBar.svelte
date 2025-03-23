<script lang="ts">
    let { children } = $props();
</script>

<nav>
    {@render children?.()}
</nav>

<style>
    nav {
        position: sticky;
        top: 0;
        box-sizing: border-box;
        width: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--padding-m) var(--padding-l);
        background: var(--background-color);
        border-bottom: 1px solid var(--border-color);
    }
</style>