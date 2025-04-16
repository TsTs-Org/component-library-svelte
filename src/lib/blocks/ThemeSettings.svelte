<script lang="ts">
	import { defaults, theme, themeValues } from "$lib/utils/themify.svelte.js";
	import Radiogroup from "$lib/components/Radio/Radiogroup.svelte";
	import RadioItem from "$lib/components/Radio/RadioItem.svelte";
	import Seperator from "$lib/components/Seperator.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";

	type Props = {
		colors: string[];
	};

	let { colors }: Props = $props();
	let devsettings = $state(true);
</script>

<div class="theme-settings">
	<Radiogroup
		value={$theme.primaryColor}
		onchange={(color) =>
			theme.update((x) => {
				x.primaryColor = color;
				return x;
			})}
	>
		{#each colors as color}
			<RadioItem
				value={color}
				ofType="color"
			></RadioItem>
		{/each}
	</Radiogroup>
	<Seperator />
	<Radiogroup
		label="Radius"
		value={$theme.borderRadius}
		onchange={(radius) =>
			theme.update((x) => {
				x.borderRadius = radius;
				return x;
			})}
	>
		<RadioItem
			value="0.25rem"
			ofType="button"
		>
			0.25
		</RadioItem>
		<RadioItem
			value="0.5rem"
			ofType="button"
		>
			0.5
		</RadioItem>
		<RadioItem
			value="0.75rem"
			ofType="button"
		>
			0.75
		</RadioItem>
	</Radiogroup>
	<Seperator />
	<Radiogroup
		label="Padding"
		value={$theme.padding}
		onchange={(radius) =>
			theme.update((x) => {
				x.padding = radius;
				return x;
			})}
	>
		<RadioItem
			value="0.6rem"
			ofType="button"
		>
			0.6
		</RadioItem>
		<RadioItem
			value="0.75rem"
			ofType="button"
		>
			0.75
		</RadioItem>
		<RadioItem
			value=".9rem"
			ofType="button"
		>
			0.9
		</RadioItem>
	</Radiogroup>
	<Seperator />
	<Radiogroup
		label="Color Influence"
		value={$theme.colorInfluence}
		onchange={(radius) =>
			theme.update((x) => {
				x.colorInfluence = radius;
				return x;
			})}
	>
		<RadioItem
			value="0.0075"
			ofType="button"
		>
			0.75
		</RadioItem>
		<RadioItem
			value="0.01"
			ofType="button"
		>
			0.1
		</RadioItem>
		<RadioItem
			value="0.015"
			ofType="button"
		>
			0.15
		</RadioItem>
	</Radiogroup>
	<Seperator />
	<Radiogroup
		label="Text Size"
		value={$theme.fontSize}
		onchange={(size) =>
			theme.update((x) => {
				x.fontSize = size;
				return x;
			})}
	>
		<RadioItem
			value="0.9rem"
			ofType="button"
		>
			0.9
		</RadioItem>
		<RadioItem
			value="1rem"
			ofType="button"
		>
			1
		</RadioItem>
		<RadioItem
			value="1.25rem"
			ofType="button"
		>
			1.25
		</RadioItem>
	</Radiogroup>
	<Checkbox
		label="DevSettings"
		bind:checked={devsettings}
	></Checkbox>
	{#if devsettings}
		<div class="devSettings">
			<div class="allColors">
				<h4>All Colors</h4>
				{#each themeValues as value}
					<div class="color">
						<p>
							{value}:
						</p>
						<span
							class="blob"
							style={`background-color: ${$theme.lightValues ? $theme.lightValues[value] : defaults.lightValues[value]};`}
						></span>
						<span
							class="blob"
							style={`background-color: ${$theme.darkValues ? $theme.darkValues[value] : defaults.darkValues[value]};`}
						></span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.theme-settings {
		padding: var(--padding-m);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--padding-m);
	}
	.blob {
		display: block;
		height: 25px;
		width: 25px;
		border-radius: 25px;
		border: 1px solid var(--border-color);
	}

	.devSettings {
		display: flex;
		flex-direction: row;
		gap: var(--padding-m);
	}

	.allColors {
		display: flex;
		flex-direction: column;
		gap: var(--padding-s);
	}
	.color {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		gap: var(--padding-m);
	}
</style>
