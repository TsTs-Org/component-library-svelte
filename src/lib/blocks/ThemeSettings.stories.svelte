<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import ThemeSettings from './ThemeSettings.svelte';
  
    const { Story } = defineMeta({
      title: '0. Theming/Themesettings',
      component: ThemeSettings,
      tags: ['autodocs'],
    });
</script>

<Story name="Default" args={{colors: ["#6a994e", "royalblue", "#9d4edd", "#FE7520", "#e63946", "#CA802B", "#99582a"]}}></Story>