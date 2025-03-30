<script lang="ts">
	import Accordion from "$lib/components/Accordion/Accordion.svelte";
	import AccordionItem from "$lib/components/Accordion/AccordionItem.svelte";
	import Button from "$lib/components/Button.svelte";
	import Card from "$lib/components/Card.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import Link from "$lib/components/Link.svelte";
	import NavigationBar from "$lib/components/NavigationBar.svelte";
	import Showcase from "$lib/components/Showcase.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import SelectItem from "$lib/components/Select/SelectItem.svelte";
	import ScrollContainer from "$lib/components/ScrollContainer.svelte";
	import SimpleLogin from "$lib/blocks/Authentication/SimpleLogin.svelte";
	import LoginAndRegister from "$lib/blocks/Authentication/LoginAndRegister.svelte";
</script>

<div class="blocks-page">
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
	.blocks-page {
		box-sizing: border-box;
		width: 100%;
		min-width: 1200px;
		display: flex;
		flex-direction: column;
		margin-inline: auto;
		gap: var(--padding-l);
		padding: var(--padding-l);
	}
	.mock-block {
		overflow: hidden;
		aspect-ratio: 16/9;
		border: thin solid var(--border-color);
		border-radius: var(--border-radius-m);
	}
</style>
