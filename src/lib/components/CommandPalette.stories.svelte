<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import "@storybook/svelte";

	import CommandPalette, { paletteState } from "./CommandPalette.svelte";

	const { Story } = defineMeta({
		title: "2. Components/CommandPalette",
		component: CommandPalette,
		tags: ["autodocs"],
		parameters: {
			docs: {
				story: {
					inline: false,
					iframeHeight: 400,
				},
			},
		},
	});
</script>

<script lang="ts">
	let initialCommands = Array(16)
		.keys()
		.map((index) => {
			return {
				commandIdentifier: index.toString(),
				commandName: `command ${index}`,
				commandFunction: () => {
					lastCommand = index.toString();
					clearTimeout(hideTimeoutId);
					hideTimeoutId = setTimeout(() => {
						lastCommand = null;
					}, 3000);
				},
			};
		})
		.toArray();

	let hideTimeoutId: number | undefined = $state(undefined);

	let lastCommand: string | null = $state(null);
</script>

<!-- FIXME: initial command of storybook isn't passed here. this is because this made the function changing the "lastCommand"-state stop working. Therefore the "handle" in the storybook ui doesn't actually do anything -->
<Story
	name="Default"
	args={{ initialCommands }}
>
	{#snippet template(args)}
		<span
			>Open palette by clicking <button
				onclick={() => {
					paletteState.open = true;
				}}>HERE</button
			>
			or using the default shortcut
			<kbd>Ctrl</kbd>+<kbd>P</kbd></span
		>
		{#if lastCommand != null}
			<div>command ran: {lastCommand}</div>
		{/if}
		<CommandPalette {initialCommands}></CommandPalette>
	{/snippet}
</Story>
