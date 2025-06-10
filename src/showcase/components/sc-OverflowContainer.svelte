
<script>
    import Showcase from "$lib/components/Showcase.svelte";
    import OverflowContainer from "$lib/components/OverflowContainer.svelte";
</script>


<Showcase name="Overflow Container">
    <div class="content-wrapper">
        <div class="overflow-container-size-wrapper">
            <OverflowContainer>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
            </OverflowContainer>
        </div>
        <div class="overflow-container-size-wrapper">
            <OverflowContainer fadeWidth="2rem">
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
            </OverflowContainer>
        </div>
        <div class="overflow-container-size-wrapper">
            <OverflowContainer fadeColor="var(--neutral-400)">
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
                <div>content</div>
            </OverflowContainer>
        </div>
    </div>
    <style>
        .content-wrapper {
            display: flex;
            gap: 1rem;
            flex-direction: column;
            align-items: center;
        }

        .overflow-container-size-wrapper {
            width: 10rem;
            background-color: var(--neutral-200);
            & > div {
                text-wrap: nowrap;
            }
        }
    </style>
</Showcase>