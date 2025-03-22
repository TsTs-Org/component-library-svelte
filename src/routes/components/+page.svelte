<script lang="ts">
    import Showcase from '$lib/components/Showcase.svelte';
</script>

<div class="components-page" >
    <Showcase name="Primary Button">
        <button>Test button</button>
    </Showcase>
    <Showcase name="Secondary Button">
        <button>Test button</button>
    </Showcase>
    <Showcase name="Ghost Button">
        <button>Test button</button>
    </Showcase>
</div>

<style>
.components-page {
    height: 100vh;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-auto-rows: 15rem;
    gap: var(--padding-xl);
    padding: var(--padding-xl);
}
</style>
