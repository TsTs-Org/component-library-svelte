<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import LoginAndRegister from './LoginAndRegister.svelte';
  
    const { Story } = defineMeta({
      title: '1. Blocks/LoginAndRegister',
      component: LoginAndRegister,
      tags: ['autodocs'],
    });
</script>

<Story name="Default"></Story>