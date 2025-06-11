<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Checkbox from './Checkbox.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/Checkbox',
      component: Checkbox,
      tags: ['autodocs'],
    });
</script>
  
<Story name="Default" />