<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Slider from './Slider.svelte';
    import Button from './Button.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Slider',
      component: Slider,
      tags: ['autodocs'],
    });

    let slider: Slider;

</script>

<Story name="Default">
    {#snippet template(args)}
        <Slider {...args} bind:this={slider}>
            {#snippet title()}
                Title
            {/snippet}
            CONTENT
        </Slider>
        <Button onclick={slider?.openSlider}>Open Slider</Button>
    {/snippet}
</Story>

<Story name="With close btn">
    {#snippet template(args)}
        <Slider bind:this={slider} {...args}>
            {#snippet title()}
                Title
            {/snippet}
            CONTENT
            {#snippet footer()}
                <Button onclick={slider?.closeSlider}>
                    Close
                </Button>
            {/snippet}
        </Slider>   
        <Button onclick={slider?.openSlider}>Open Slider</Button>
    {/snippet}
</Story>