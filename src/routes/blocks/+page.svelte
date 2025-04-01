<script lang="ts">
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
		height: fit-content;
		display: flex;
		flex-direction: column;
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
