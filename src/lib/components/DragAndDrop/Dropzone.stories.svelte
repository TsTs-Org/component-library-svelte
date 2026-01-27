<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Dropzone from './Dropzone.svelte';
	import Icon from '../Icon.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Dropzone',
      component: Dropzone,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    {#snippet template(args)}
        <Dropzone identifier="Zone1" group={2}>
            <div class="custom-style">
                <p class="mock-elem">Test1</p>
                <p class="mock-elem">Test2</p>
            </div>
        </Dropzone>    
        <Dropzone identifier="Zone2" group={2}>
            <div class="custom-style">
                <p class="mock-elem">Test3</p>
            </div>
        </Dropzone>    
    {/snippet}
</Story>

<style>
    .custom-style {
        min-height: 60px;
        background-color: var(--foreground-color);
        margin: 10px;
    }
    .mock-elem {
        padding: 5px;
    }
</style>