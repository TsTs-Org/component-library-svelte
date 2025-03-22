<script lang="ts">
    let { href, children } = $props();
</script>

<a href={href}>
    {@render children?.()}
</a>

<style>
    a {
        text-decoration: none;
        color: var(--text-color);
        padding: var(--padding-m);
        font-size: .9rem;
        border-radius: var(--border-radius-s);
    }
    a:hover {
        background-color: var(--neutral-hover-color);
    }
</style>