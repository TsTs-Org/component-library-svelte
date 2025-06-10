<script>
	import Showcase from "$lib/components/Showcase.svelte";
	import { Button, Icon, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "$lib/index.js";

</script>

<Showcase name="Table">
    <div class="mock-grid">
        <Table
            initial={["", "Name", "Lastname", "Actions"]}
            ignoreColumns={[""]}
            searchbar
            bordered
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
    </div>
</Showcase>