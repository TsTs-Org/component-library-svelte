<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import OverflowContainer from './OverflowContainer.svelte';
  
    const { Story } = defineMeta({
      title: 'Components/OverflowContainer',
      component: OverflowContainer,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
</Story>

<Story name="Custom fadeWidth" args={{ fadeWidth: '12rem' }}>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
</Story>

<Story name="Custom fadeColor" args={{ fadeColor: 'var(--neutral-400)' }}>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
    <div>content</div>
</Story>