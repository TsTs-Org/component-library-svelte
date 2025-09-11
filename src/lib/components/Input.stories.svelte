<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Input from './Input.svelte';
    import Icon from './Icon.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Input',
      component: Input,
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

<Story name="With Icon" args={{ type: "text", label: "With Icon", placeholder: "username", description: "The name to identify the user" }}>
    {#snippet template(args)}
        <Input {...args}>
            {#snippet icon()}
                <Icon iconName="account_circle" color="inherit" />
            {/snippet}
        </Input>
    {/snippet}
</Story>

<Story name="Password with Icon" args={{ type: "password", label: "Password", placeholder: "Enter your password", description: "Your secure password" }}>
    {#snippet template(args)}
    <Input {...args}>
        {#snippet icon()}
            <Icon iconName="account_circle" color="inherit" />
        {/snippet}
    </Input>
    {/snippet}
</Story>