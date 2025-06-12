<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Accordion from './Accordion.svelte';
    import AccordionItem from './AccordionItem.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Accordion',
      component: Accordion,
      tags: ['autodocs'],
      argTypes: {
        variant: {
          control: { type: 'select' },
          options: ['default', 'ghost']
        },
      }
    });
  </script>
  
  <Story name="Default"> 
    {#snippet template(args)}
      <Accordion {...args}>
        <AccordionItem title="Item 1">
          <p>Content for item 1</p>
        </AccordionItem>
  
        <AccordionItem title="Item 2">
          <p>Content for item 2</p>
        </AccordionItem>
  
        <AccordionItem title="Item 3">
          <p>Content for item 3</p>
        </AccordionItem>
      </Accordion>
    {/snippet}  
  </Story>