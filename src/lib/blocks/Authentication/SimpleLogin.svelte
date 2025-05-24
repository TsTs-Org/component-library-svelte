<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import Loader from "$lib/components/Loader.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let username: string = $state("");
	let password: string = $state("");
	let error_message: string = $state("");

	type Props = {
		onsubmit?: (data: object) => Promise<{ success: boolean; msg: string }>;
		header?: string;
		description?: string;
		service?: string;
		timeout?: number;
	} & HTMLAttributes<any>;

	let { onsubmit, header, description, service, timeout = 5000, ...restProps }: Props = $props();

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
			Promise.race([onsubmit({ username: username, password: password }), timeoutTimer])
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
</script>

<div class="SimpleLogin">
	<h3 class="service">{service}</h3>
	<form
		bind:this={form}
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
			Login
		</Button>
	</form>
	<div
		class="main"
		style="display: none;"
		bind:this={loader}
	>
		<Loader></Loader>
	</div>
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
		align-items: center;
		width: fit-content;
		height: fit-content;
		gap: var(--padding-s);
		justify-content: center;
		background-color: var(--foreground-color);
		border-radius: var(--border-radius-m);
		padding: var(--padding-l) var(--padding-xl);
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
			color: var(--text-color-muted);
		}
	}
</style>
