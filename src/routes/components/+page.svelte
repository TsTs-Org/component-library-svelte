<script lang="ts">
	import Link from '$lib/components/Link.svelte';
import NavigationBar from '$lib/components/NavigationBar.svelte';
    import Showcase from '$lib/components/Showcase.svelte';
</script>

<div class="components-page" >
    <Showcase name="Border Radius">
        <div class="mock-grid">
            <div class="mock-box fixed-size" style="border-radius: var(--border-radius-s);">S</div>
            <div class="mock-box fixed-size" style="border-radius: var(--border-radius-m);">M</div>
            <div class="mock-box fixed-size" style="border-radius: var(--border-radius-l);">L</div>
            <div class="mock-box fixed-size" style="border-radius: var(--border-radius-xl);">XL</div>
        </div>
    </Showcase>

    <Showcase name="Padding">
        <div class="mock-grid">
            <div class="mock-box" style="padding: var(--padding-s)">S</div>
            <div class="mock-box" style="padding: var(--padding-m)">M</div>
            <div class="mock-box" style="padding: var(--padding-l)">L</div>
            <div class="mock-box" style="padding: var(--padding-xl)">XL</div>
        </div>
    </Showcase>

    <Showcase name="Navigation Bar">
        <NavigationBar>
            <div>
                <Link href="#" size="s">Mock</Link>
                <Link href="#" size="s">Mock</Link>
            </div>
        </NavigationBar>
    </Showcase>

    <Showcase name="Link sizes">
        <div class="mock-grid">
            <Link href="#" size="s" variant="colored">Link S</Link>
            <Link href="#" size="m" variant="colored">Link M</Link>
            <Link href="#" size="l" variant="colored">Link L</Link>
        </div>
    </Showcase>

    <Showcase name="Link variants">
        <div class="mock-grid">
            <Link href="#" variant="ghost">Ghost</Link>
            <Link href="#" variant="bordered">Bordered</Link>
            <Link href="#" variant="colored">Colored</Link>
        </div>
    </Showcase>
</div>

<style lang="scss">
.components-page {
    height: 100vh;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-auto-rows: 15rem;
    gap: var(--padding-l);
    padding: var(--padding-l);
}

.mock-grid {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
    gap: var(--padding-m);
}

.mock-box {
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-m);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    &.fixed-size {
        width: 5rem;
        height: 5rem;
    }
}

</style>
