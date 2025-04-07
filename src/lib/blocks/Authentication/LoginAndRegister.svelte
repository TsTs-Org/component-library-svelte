<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let username: string = $state("");
	let password: string = $state("");

	type Props = {
		onsubmit?: (data: object) => void;
		loading?: boolean;
		loginHeader: string;
		loginDescription: string;
		registerHeader: string;
		registerDescription: string;
		service?: string;
	} & HTMLAttributes<any>;

	let {
		loading = false,
		onsubmit = ({}) => {},
		loginHeader,
		loginDescription,
		registerHeader,
		registerDescription,
		service,
		...restProps
	}: Props = $props();

	function submit_proxy(e: SubmitEvent) {
		loading = true;
		e.preventDefault();
		onsubmit({
			username: username,
			password: password,
			action: swap ? "register" : "login",
		});
	}

	let swap = $state(false);
	const img_src =
		"https://plus.unsplash.com/premium_photo-1675629118861-dc8aa2acea74?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
</script>

<div class="LoginAndRegister">
	<h3 class="service">{service}</h3>
	<div class="main">
		<img
			class:swap
			src={img_src}
			alt="img"
		/>
		<button
			class:swap
			disabled={loading}
			onclick={() => {
				swap = !swap;
			}}
		>
			<Icon
				size="m"
				iconName="swapHorizontal"
			/>
		</button>
		<form
			class:swap
			onsubmit={submit_proxy}
			{...restProps}
		>
			<div class="header">
				<h2>{swap ? registerHeader : loginHeader}</h2>
				<p>{swap ? registerDescription : loginDescription}</p>
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
				{swap ? "Register" : "Login"}
			</Button>
		</form>
	</div>
</div>

<style lang="scss">
	.LoginAndRegister {
		--width: 22rem;
		--height: 28rem;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		gap: var(--padding-m);
		.service {
			color: var(--text-color-muted);
		}
	}

	.main {
		position: relative;
		display: flex;
		border-radius: var(--border-radius-m);
		overflow: hidden;
		img {
			object-fit: cover;
			width: var(--width);
			height: var(--height);
			&.swap {
				transform: translateX(100%);
			}
		}
		button {
			z-index: 10;
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 10%;
			left: calc(50% - 1.5rem);
			border-radius: var(--border-radius-l);
			width: 3rem;
			height: 3rem;
			background-color: var(--background-color);
			&:disabled {
				cursor: not-allowed;
				background-color: var(--neutral-hover-color);
			}
			&:hover {
				background-color: var(--hover-color);
			}
			&.swap {
				transform: rotate(180deg);
			}
		}
		form {
			width: var(--width);
			height: var(--height);
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			gap: var(--padding-s);
			justify-content: center;
			background-color: var(--foreground-color);
			padding: var(--padding-l);
			&.swap {
				transform: translateX(-100%);
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
		}
	}
</style>
