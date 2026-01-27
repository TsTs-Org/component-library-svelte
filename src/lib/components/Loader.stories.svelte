<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Loader from './Loader.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Loader',
      component: Loader,
      tags: ['autodocs'],
      argTypes: {
        size: {
          control: { type: 'select' },
          options: ['xs', 's', 'm', 'l'],
        },
        variant: {
          control: { type: 'select' },
          options: ['default', 'onPrimary'],
        },
      }
    });
  </script>
  
  <Story name="Default" />