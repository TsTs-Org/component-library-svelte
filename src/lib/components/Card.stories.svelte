<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Card from './Card.svelte';
    import Icon from './Icon.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/Card',
      component: Card,
      tags: ['autodocs'],
      argTypes: {
        size: {
          control: { type: 'select' },
          options: ['s', 'm', 'l'],
        },
        variant: {
          control: { type: 'select' },
          options: ['primary', 'bordered', 'ghost'],
        },
        loading: {
          control: { type: 'boolean' },
        },
      }
    });
  </script>

  <Story name="Icon Button">
    {#snippet template(args)}
    <Card {...args}>
        {#snippet title()}
            Title text
        {/snippet}
        {#snippet iconRight(size)}
            <Icon
                {size}
                iconName="x"
            ></Icon>
        {/snippet}
    </Card>
    {/snippet}
  </Story>

