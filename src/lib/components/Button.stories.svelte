<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Button from './Button.svelte';
    import Icon from './Icon.svelte';
    import { fn } from 'storybook/test';
  
    const { Story } = defineMeta({
      title: 'Components/Button',
      component: Button,
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
      },
      args: {
        onclick: fn(),
      }
    });
  </script>
  
  <Story name="Default"> Button </Story>
  <Story name="Bordered" args={{variant: "bordered"}}> Button </Story>
  <Story name="Loading" args={{loading: true}}> Button </Story>

  <Story name="Icon Button">
    {#snippet template(args)}
    <Button {...args}>
        {#snippet icon()}
            <Icon
                size="m"
                fill="inherit"
                iconName="moon"
            ></Icon>
        {/snippet}
    </Button>
    {/snippet}
  </Story>

