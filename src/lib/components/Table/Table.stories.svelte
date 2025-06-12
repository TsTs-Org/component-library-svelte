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
    initial={["", "Name", "Lastname", "Actions"]}
    ignoreColumns={[""]}   
>
    {#snippet headerAction()}
        <Button size="s">
            {#snippet icon()}
                <Icon
                    size="s"
                    iconName="plus"
                    fill="inherit"
                />
            {/snippet}
        </Button>
    {/snippet}
    <TableHeader>
        <TableRow>
            <TableHead></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Middlename</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Actions</TableHead>
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
            <TableCell _for="">O</TableCell>
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
            <TableCell _for="">O</TableCell>
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
            <TableCell _for="">O</TableCell>
            <TableCell _for="name">Moritz</TableCell>
            <TableCell _for="middlename">Matthias</TableCell>
            <TableCell _for="lastname">Maier</TableCell>
        </TableRow>
    </TableBody>
    <TableFooter>
        <TableRow>

            <TableCell _for="_none"></TableCell>
            <TableCell _for="_none">Data</TableCell>
            <TableCell _for="_none"></TableCell>
            <TableCell _for="_none"></TableCell>
            <TableCell _for="_none">100</TableCell>
        </TableRow>
    </TableFooter>
</Table>
    {/snippet}
</Story>