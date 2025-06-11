<script module>

    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Button from '../Button.svelte';

    import Tabs from './Tabs.svelte';
	import TabTrigger from './TabTrigger.svelte';
    import TabContent from './TabContent.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/Tabs',
      component: Tabs,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <Tabs {...args}>
            <TabTrigger tabIdentifier="tab1">
                {#snippet trigger(selectTab)}
                    <Button onclick={selectTab}>Select Tab 1</Button>
                {/snippet}
            </TabTrigger>
            <TabTrigger tabIdentifier="tab2">
                {#snippet trigger(selectTab)}
                    <Button onclick={selectTab}>Select Tab 2</Button>
                {/snippet}
            </TabTrigger>

            <TabContent tabIdentifier="tab1">This is tab 1 content</TabContent>
            <TabContent tabIdentifier="tab2">This is tab 2 content</TabContent>

        </Tabs>        
    {/snippet}
</Story>