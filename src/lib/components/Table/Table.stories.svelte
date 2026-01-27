<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Icon from '../Icon.svelte';
    import Button from '../Button.svelte';

    import Table from './Table.svelte';
    import TableRow from './TableRow.svelte';
    import TableCell from './TableCell.svelte';
    import TableHeader from './TableHeader.svelte';
    import TableHead from './TableHead.svelte';
    import TableBody from './TableBody.svelte';
    import TableFooter from './TableFooter.svelte';
  
    const { Story } = defineMeta({
      title: '2. Components/Table',
      component: Table,
      tags: ['autodocs'],
    });
</script>

<Story name="Default">
    {#snippet template(args)}
    <Table
    {...args}
    initial={["test", "name", "lastname", "__actions"]}
    ignoreColumns={["test", "__actions"]}
    searchbar
    columnSelector
    bordered
>
    {#snippet headerAction()}
        <Button size="s">
            {#snippet icon()}
                <Icon
                    size="s"
                    iconName="add"
                    color="inherit"
                />
            {/snippet}
        </Button>
    {/snippet}
    <TableHeader>
        <TableRow>
            <TableHead _for="test"></TableHead>
            <TableHead _for="name">Name</TableHead>
            <TableHead _for="middlename">Middlename</TableHead>
            <TableHead _for="lastname">Lastname</TableHead>
            <TableHead _for="__actions">Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow
            rowActions={[
                {
                    title: "ActionOne",
                    iconName: "eyeOpen",
                    callback: (val) => {
                        console.log(val);
                    },
                },
            ]}
        >
            <TableCell _for="test">O</TableCell>
            <TableCell _for="name">Kevien</TableCell>
            <TableCell _for="middlename">Matthias</TableCell>
            <TableCell _for="lastname">Flieger</TableCell>
        </TableRow>
        <TableRow
            rowActions={[
                {
                    title: "ActionOne",
                    callback: (val) => {
                        console.log(val);
                    },
                },
            ]}
        >
            <TableCell _for="test">O</TableCell>
            <TableCell _for="name">Michael</TableCell>
            <TableCell _for="middlename">Matthias</TableCell>
            <TableCell _for="lastname">Kiehn</TableCell>
        </TableRow>
        <TableRow rowActions={[
            {
                title: "ActionOne",
                iconName: "eyeOpen",
                callback: (val) => {
                    console.log(val);
                }
            }, {
                title: "ActionTwo",
                iconName: "eyeOpen",
                callback: (val) => {
                    console.log(val);
                },
            }
        ]}>
            <TableCell _for="test">O</TableCell>
            <TableCell _for="name">Moritz</TableCell>
            <TableCell _for="middlename">Matthias</TableCell>
            <TableCell _for="lastname">Maier</TableCell>
        </TableRow>
    </TableBody>
</Table>
    {/snippet}
</Story>