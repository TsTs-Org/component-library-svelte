<script lang="ts">
	import SimpleLogin from "$lib/blocks/Authentication/SimpleLogin.svelte";
	import LoginAndRegister from "$lib/blocks/Authentication/LoginAndRegister.svelte";
	import Tabs from "$lib/components/Tabs/Tabs.svelte";
	import TabContent from "$lib/components/Tabs/TabContent.svelte";
	import AutoGenerateTriggers from "$lib/components/Tabs/AutoGenerateTriggers.svelte";
	import Button from "$lib/components/Button.svelte";
	import DynamicHorizontalTabs from "$lib/blocks/Tabs/DynamicHorizontalTabsBlock.svelte";
</script>

<div class="blocks-page">
	<div class="mock-block">
		<div style="padding: .5rem">
			<Tabs defaultTab="tab1">
				<div style="display: flex">
					<AutoGenerateTriggers>
						{#snippet tabTrigger(selectTab, isSelected, tabIdentifier)}
							<Button
								onclick={selectTab}
								style={isSelected() ? "background-color: var(--hover-color)" : ""}
								>{tabIdentifier}</Button
							>
						{/snippet}
					</AutoGenerateTriggers>
				</div>
				<TabContent tabIdentifier="tab1">
					<h3>Tabs in tab</h3>

					<Tabs>
						<DynamicHorizontalTabs></DynamicHorizontalTabs>
					</Tabs>
				</TabContent>
				<TabContent tabIdentifier="tab2">this is tab 2</TabContent>
				<TabContent tabIdentifier="tab3">this is tab 3</TabContent>
				<TabContent tabIdentifier="tab4">this is tab 4</TabContent>
			</Tabs>
		</div>
	</div>
	<div class="mock-block">
		<SimpleLogin
			onsubmit={(data) => {
				console.log(data);
			}}
			service="MockService"
			header="Welcome back"
			description="Login to your account"
		/>
	</div>
	<div class="mock-block">
		<LoginAndRegister
			onsubmit={(data) => {
				console.log(data);
			}}
			service="MockService"
			loginHeader="Login"
			loginDescription="Login to your account"
			registerHeader="Register"
			registerDescription="Create a new account"
		/>
	</div>
</div>

<style lang="scss">
	@media (max-width: 900px) {
		.mock-block {
			aspect-ratio: 9/16;
		}
	}

	@media (min-width: 900px) {
		.mock-block {
			aspect-ratio: 16/9;
		}
	}

	.mock-block {
		overflow: hidden;
		border: thin solid var(--border-color);
		border-radius: var(--border-radius-m);
	}
	.blocks-page {
		box-sizing: border-box;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}
</style>
