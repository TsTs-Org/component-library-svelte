<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let username: string = $state("");
	let password: string = $state("");

	type Props = {
		onsubmit?: (data: object) => void;
		loading?: boolean;
		header?: string;
		description?: string;
		service?: string;
	} & HTMLAttributes<any>;

	let {
		loading = false,
		onsubmit = ({}) => {},
		header,
		description,
		service,
		...restProps
	}: Props = $props();

	function submit_proxy(e: SubmitEvent) {
		loading = true;
		e.preventDefault();
		onsubmit({ username: username, password: password });
	}
</script>

<div class="SimpleLogin">
	<h3 class="service">{service}</h3>
	<form
		class="main"
		onsubmit={submit_proxy}
		{...restProps}
	>
		<div class="header">
			<h2>{header}</h2>
			<p>{description}</p>
		</div>
		<Input
			bind:value={username}
			disabled={loading}
			type="text"
			placeholder=""
			label="Username"
		/>
		<Input
			bind:value={password}
			disabled={loading}
			type="password"
			placeholder=""
			label="Password"
		/>

		<Button
			{loading}
			variant="primary"
			size="m"
			type="submit"
		>
			Login
		</Button>
	</form>
</div>

<style lang="scss">
	.SimpleLogin {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		gap: var(--padding-m);
		justify-content: center;
		align-items: center;
		background-color: var(--background-color);
		.service {
			color: var(--text-color-muted);
		}
	}

	.main {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: fit-content;
		height: fit-content;
		gap: var(--padding-s);
		justify-content: center;
		background-color: var(--foreground-color);
		border-radius: var(--border-radius-m);
		padding: var(--padding-l);
	}

	.header {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		gap: var(--padding-s);
		padding: var(--padding-s);
		justify-content: center;
		align-items: center;
		p {
			font-size: 0.95rem;
			color: var(--text-color-muted);
		}
	}
</style>
