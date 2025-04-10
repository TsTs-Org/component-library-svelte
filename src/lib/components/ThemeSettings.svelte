<script>
	import { theme } from "$lib/utils/themify.svelte.js";
	import Radiogroup from "./Radio/Radiogroup.svelte";
	import RadioItem from "./Radio/RadioItem.svelte";
	import Seperator from "./Seperator.svelte";
</script>

<div class="theme-settings">
	<Radiogroup
		label="Color"
		value={$theme.primaryColor}
		onchange={(color) =>
			theme.update((x) => {
				x.primaryColor = color;
				return x;
			})}
	>
		<RadioItem
			value="seagreen"
			ofType="color"
		></RadioItem>
		<RadioItem
			value="royalblue"
			ofType="color"
		></RadioItem>
		<RadioItem
			value="rebeccapurple"
			ofType="color"
		></RadioItem>
		<RadioItem
			value="#F45D01"
			ofType="color"
		></RadioItem>
		<RadioItem
			value="#b08968"
			ofType="color"
		></RadioItem>
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
			value="0rem"
			ofType="button"
		>
			0
		</RadioItem>
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
		label="Radius"
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
		label="ColorInfluence"
		value={$theme.colorInfluence}
		onchange={(radius) =>
			theme.update((x) => {
				x.colorInfluence = radius;
				return x;
			})}
	>
		<RadioItem
			value="0.005"
			ofType="button"
		>
			0.5
		</RadioItem>
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
</div>

<style lang="scss">
	.theme-settings {
		padding: var(--padding-m);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--padding-m);
	}
</style>
