<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import ScrollContainer from './ScrollContainer.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/ScrollContainer',
      component: ScrollContainer,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    {#each { length: 50 }, i}
        <p>Text {i}</p>
    {/each}
</Story>