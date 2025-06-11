<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Popover from './Popover.svelte';
    import Button from './Button.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/Popover',
      component: Popover,
      tags: ['autodocs'],
    });

    let closablePopover;

</script>

<Story name="Default">
    {#snippet template(args)}
        <Popover {...args}>
            {#snippet title()}
                Some title
            {/snippet}
            CONTENT
            {#snippet popoverTrigger(trigger)}
                <Button onclick={trigger}>Open Popover</Button>
            {/snippet}
        </Popover>
    {/snippet}
</Story>

<Story name="With close btn">
    {#snippet template(args)}
        <Popover bind:this={closablePopover} {...args}>
            {#snippet title()}
                should be closed by content
            {/snippet}
            <Button onclick={() => { closablePopover.closePopover(); }}>
                close from inner content
            </Button>
            {#snippet popoverTrigger(trigger)}
                <Button onclick={trigger}>Open Popover</Button>
            {/snippet}
        </Popover>
    {/snippet}
</Story>