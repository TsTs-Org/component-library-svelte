<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Textarea from './Textarea.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Textarea',
      component: Textarea,
      tags: ['autodocs'],
      argTypes: {
        type: {
          control: { type: 'select' },
          options: ['text', 'email', 'password', 'number', 'search'],
        },
        label: {
          control: { type: 'text' },
        },
        placeholder: {
          control: { type: 'text' },
        },
        description: {
          control: { type: 'text' },
        },
      },
    });
</script>
  
<Story name="Default" args={{ type: "text" }} />