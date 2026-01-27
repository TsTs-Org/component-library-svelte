<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Icon from "$lib/components/Icon.svelte";
	import Input from "$lib/components/Input.svelte";
	import Loader from "$lib/components/Loader.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let username: string = $state("");
	let password: string = $state("");
	let error_message: string = $state("");

	type Props = {
		onsubmit?: (data: object) => void;
		loginHeader: string;
		loginDescription: string;
		registerHeader: string;
		registerDescription: string;
		service?: string;
		timeout?: number;
	} & HTMLAttributes<any>;

	let {
		onsubmit = ({}) => {},
		loginHeader,
		loginDescription,
		registerHeader,
		registerDescription,
		service,
		timeout = 5000,
		...restProps
	}: Props = $props();

	let swapButton: HTMLButtonElement;
	let form: HTMLFormElement;
	let loader: HTMLDivElement;

	function setFormDisabled(disabled: boolean) {
		if (form && loader) {
			form.querySelectorAll("input, button").forEach((el) => {
				if (el instanceof HTMLInputElement || el instanceof HTMLButtonElement) {
					el.disabled = disabled;
				}
			});
			const formsize = form.getBoundingClientRect();
			swapButton.disabled = disabled;
			form.style.display = disabled ? "none" : "flex";
			loader.style.width = `${formsize.width}px`;
			loader.style.height = `${formsize.height}px`;
			loader.style.display = disabled ? "flex" : "none";
		}
	}

	async function submit_proxy(e: SubmitEvent) {
		e.preventDefault();
		setFormDisabled(true);

		const timeoutTimer = new Promise((_, reject) => {
			setTimeout(() => {
				reject(new Error("Promise timed out"));
			}, timeout);
		});
		if (onsubmit) {
			Promise.race([
				onsubmit({ username: username, password: password, action: swap ? "register" : "login" }),
				timeoutTimer,
			])
				.then((e) => {
					error_message = e.msg;
				})
				.catch((e) => {
					error_message = "Submit timeout";
					console.warn(e);
				})
				.finally(() => {
					// loading = false;
					setFormDisabled(false);
					password = "";
				});
		}
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
			bind:this={swapButton}
			onclick={() => {
				swap = !swap;
			}}
		>
			<Icon
				size="m"
				iconName="swap_horiz"
			/>
		</button>
		<form
			bind:this={form}
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
				type="text"
				placeholder=""
				label="Username"
			/>
			<Input
				bind:value={password}
				type="password"
				placeholder=""
				label="Password"
			/>
			<p style="color: rgb(230, 10, 10);">{error_message}</p>

			<Button
				variant="primary"
				size="m"
				type="submit"
			>
				{swap ? "Register" : "Login"}
			</Button>
		</form>
		<div
			class="loader"
			style="display: none;"
			class:swap
			bind:this={loader}
		>
			<Loader></Loader>
		</div>
	</div>
</div>

<style lang="scss">
	@media (max-width: 900px) {
		.main {
			img {
				display: none !important;
			}
			button {
				top: initial !important;
				top: 1% !important;
			}
		}
	}

	@media (min-width: 900px) {
		.main {
			img {
				&.swap {
					transform: translateX(100%);
				}
			}
		}
		form,
		.loader {
			&.swap {
				transform: translateX(-100%);
			}
		}
	}

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
			transition: transform 0.4s ease;
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
			transition: transform 0.4s ease;
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
			transition: transform 0.4s ease;

			.header {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				gap: var(--padding-s);
				padding: var(--padding-s);
				justify-content: center;
				align-items: center;
				p {
					color: var(--text-color-muted);
				}
			}
		}
	}

	.loader {
		background-color: var(--foreground-color);
		width: var(--width);
		height: var(--height);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
