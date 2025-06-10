<script>
	import { BaseChart, Button, Icon, Layout, Navigationbar, NavigationbarItem, Sidebar, SidebarItem } from "$lib/index.js";

	let sidebarClosed = $state(false);
</script>

<div class="mock-block">
    <Layout style="height: 100%">
        {#snippet topnav()}
            <Navigationbar variant="glass">
                {#snippet left()}
                    <Button
                        variant="ghost"
                        onclick={() => (sidebarClosed = !sidebarClosed)}
                    >
                        {#snippet icon()}
                            <Icon iconName={sidebarClosed ? "sun" : "moon"} />
                        {/snippet}
                    </Button>
                    <NavigationbarItem href="#1">Home</NavigationbarItem>
                    <NavigationbarItem href="#2">Blocks</NavigationbarItem>
                    <NavigationbarItem href="#3">Components</NavigationbarItem>
                {/snippet}
            </Navigationbar>
        {/snippet}

        {#snippet leftSidebar()}
            <Sidebar {sidebarClosed}>
                {#snippet sidebarHeader(collapsed)}
                    {#if !collapsed()}
                        <BaseChart
                            chartType="line"
                            displayTooltip
                            yGrid
                            yAxis
                            xAxis
                            labels={["January", "February", "March", "May", "June"]}
                            data={[
                                {
                                    title: "DataOne",
                                    data: [12, 19, 5, 5, 12, 15],
                                },
                                {
                                    title: "DataTwo",
                                    data: [2, 8, 2, 11, 7, 4],
                                },
                            ]}
                        ></BaseChart>
                    {/if}
                {/snippet}
                {#each ["Dashboard", "Lifecycle", "Analytics", "Projects"] as name}
                    <SidebarItem size="s">{name}</SidebarItem>
                {/each}
                {#snippet sidebarFooter()}
                    <SidebarItem>Logout</SidebarItem>
                {/snippet}
            </Sidebar>
        {/snippet}

        <h2 style="margin: auto">Main Content</h2>
    </Layout>
</div>