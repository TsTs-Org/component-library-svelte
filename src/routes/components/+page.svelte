<script lang="ts">
	import Link from '$lib/components/Link.svelte';
import NavigationBar from '$lib/components/NavigationBar.svelte';
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
    <Showcase name="Navigation Bar">
        <NavigationBar>
            <div>
                <Link href="#">Mock</Link>
                <Link href="#">Mock</Link>
            </div>
        </NavigationBar>
    </Showcase>
    <Showcase name="Link">
        <Link href="#">Mock Link</Link>
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
