<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import SimpleLogin from './SimpleLogin.svelte';
  
    const { Story } = defineMeta({
      title: '1. Blocks/SimpleLogin',
      component: SimpleLogin,
      tags: ['autodocs'],
    });
</script>

<Story name="Default"></Story>