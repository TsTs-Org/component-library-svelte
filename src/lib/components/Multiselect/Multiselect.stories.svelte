<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Multiselect from './Multiselect.svelte';
    import MultiselectItem from './MultiselectItem.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Multiselect',
      component: Multiselect,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <Multiselect
            placeholder="Select a fruit..."
            label="Fruits"
            description="Dropdown to select a fruit"
            {...args}
        >
            <MultiselectItem value="apple" label="Apple" />
            <MultiselectItem value="banana" label="Banana" />
            <MultiselectItem value="orange" label="Orange" />
            <MultiselectItem value="grape" label="Grape" />
        </Multiselect>
        
    {/snippet}
</Story>