<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Select from './Select.svelte';
    import SelectItem from './SelectItem.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/Select',
      component: Select,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <Select
            placeholder="Select a fruit..."
            label="Fruits"
            description="Dropdown to select a fruit"
            {...args}
        >
            <SelectItem value="apple" label="Apple" />
            <SelectItem value="banana" label="Banana" />
            <SelectItem value="orange" label="Orange" />
            <SelectItem value="grape" label="Grape" />
        </Select>
        
    {/snippet}
</Story>