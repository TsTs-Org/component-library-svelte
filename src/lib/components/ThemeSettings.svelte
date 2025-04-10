<script>
	import Radiogroup from "./Radio/Radiogroup.svelte";
	import RadioItem from "./Radio/RadioItem.svelte";
</script>

<div class="theme-settings">
	<Radiogroup
		label="Color"
		value="seagreen"
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
			value="red"
			ofType="color"
		></RadioItem>
		<RadioItem
			value="magenta"
			ofType="color"
		></RadioItem>
	</Radiogroup>
	<Radiogroup
		label="Radius"
		value="0"
	>
		<RadioItem
			value="0"
			ofType="button"
		>
			0
		</RadioItem>
		<RadioItem
			value="0.5"
			ofType="button">0.5</RadioItem
		>
		<RadioItem
			value="1"
			ofType="button">1</RadioItem
		>
	</Radiogroup>
</div>

<style lang="scss">
	.theme-settings {
		flex: 1;
		margin: var(--padding-l);
		padding: var(--padding-m);
		display: flex;
		align-items: center;
		border-radius: var(--border-radius-m);
		border: thin solid var(--border-color);
		gap: var(--padding-m);
	}
</style>
