<script
	lang="ts"
	module
>
	import { SvelteMap } from "svelte/reactivity";
	import Input from "./Input.svelte";
	import { onMount } from "svelte";

	type CommandValue = { commandName: string; commandFunction: () => void };

	let commandMap: SvelteMap<string, CommandValue> = new SvelteMap();

	let shortcutCtrlKey = $state(true);
	let shortcutKey = $state("p");

	/* TODO: instead of directly exporting this state like this and making it writable, this should be controlled by open() / close() functions! */

	class PaletteState {
		open = $state(false);
	}

	export const paletteState = new PaletteState();
</script>

<script lang="ts">
	// lateron use commandName as identifer for translagion
	type Props = {
		/**
		 * the list of commands to be executable. identified by their commandIdentifier and described in the list with its commandName
		 */
		initialCommands?: {
			commandIdentifier: string;
			commandName: string;
			commandFunction: () => void;
		}[];
	};
	let { initialCommands = [] }: Props = $props();

	// let open = $state(false);

	function runCommand(command: [string, CommandValue]) {
		command[1].commandFunction();
		searchTerm = "";
		// open = false;
		paletteState.open = false;
	}

	onMount(() => {
		initialCommands.forEach((command) => {
			commandMap.set(command.commandIdentifier, {
				commandName: command.commandName,
				commandFunction: command.commandFunction,
			});
		});

		document.addEventListener("keyup", (keyboardEvent) => {
			if (keyboardEvent.ctrlKey == shortcutCtrlKey && keyboardEvent.key == shortcutKey) {
				paletteState.open = true;
			}
		});

		document.addEventListener("keyup", (keyboardEvent) => {
			if (keyboardEvent.key == "Escape") {
				paletteState.open = false;
			}
		});

		document.addEventListener("keyup", (keyboardEvent) => {
			if (keyboardEvent.key == "Enter") {
				let currentCommand = selectableCommands.at(0);
				if (!!currentCommand) {
					runCommand(currentCommand);
				}
			}
		});
	});

	let searchTerm = $state("");

	let selectableCommands = $derived(
		commandMap
			.entries()
			.filter((commandEntry) => {
				return commandEntry[1].commandName.includes(searchTerm);
			})
			.toArray()
	);
</script>

{#if paletteState.open}
	<div
		role="none"
		onclick={() => {
			paletteState.open = false;
		}}
		class="background-modifier"
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			onclick={(ev) => {
				ev.stopPropagation();
			}}
			class="command-palette"
			tabindex="-1"
			role="dialog"
			aria-modal="true"
		>
			<Input
				autofocus
				bind:value={searchTerm}
			></Input>

			<div
				class="command-list"
				tabindex="-1"
			>
				{#each selectableCommands as command}
					<div
						role="button"
						tabindex="0"
						class="command"
						onclick={() => runCommand(command)}
						onkeyup={(ev) => {
							if (ev.key != "Enter") return;
							ev.stopPropagation();
							runCommand(command);
						}}
					>
						{command[1].commandName}
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.background-modifier {
		width: 100vw;
		height: 100vh;
		background-color: #22222222;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1000;

		display: flex;
		justify-content: center;
	}

	.command-palette {
		background-color: var(--background-color);
		width: 420px;
		max-height: min(420px, 100vh);
		border-radius: var(--border-radius-m);
		box-sizing: border-box;
		padding: var(--padding-m);
		display: flex;
		flex-direction: column;
		height: fit-content;
	}

	.command-list {
		overflow: scroll;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.command {
		background-color: var(--foreground-color);
		padding: var(--padding-xs);
		border-radius: var(--border-radius-s);
	}
</style>
