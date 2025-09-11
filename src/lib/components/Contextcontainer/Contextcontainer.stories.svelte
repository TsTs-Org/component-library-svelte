<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Contextcontainer from './Contextcontainer.svelte';
    import Contextmenu from './Contextmenu.svelte';
    import ContextmenuItem from './ContextmenuItem.svelte';
    import Icon from '../Icon.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Contextcontainer',
      component: Contextcontainer,
      tags: ['autodocs'],
    });
  </script>
  
  <Story name="Default"> 
    {#snippet template(args)}
    <Contextcontainer {...args}>
        <Contextmenu>
            <ContextmenuItem>Test</ContextmenuItem>
            <ContextmenuItem>
                {#snippet icon()}
                    <Icon
                        size="s"
                        iconName="visibility"
                    />
                {/snippet}
                Test
            </ContextmenuItem>
            <ContextmenuItem>
                {#snippet icon()}
                    <Icon
                        size="s"
                        iconName="visibility_off"
                    />
                {/snippet}
                Test
            </ContextmenuItem>
        </Contextmenu>
        <div
            style="
                display: flex;
                align-items: center; 
                justify-content: center;
                border: thin solid var(--border-color);
                width: 100%;
                height: 10rem; 
                border-radius: var(--border-radius-m); "
        >
            <h4>Right Click Me</h4>
        </div>
    </Contextcontainer>
    {/snippet}  
  </Story>