<script>
	import Checkbox from "$lib/components/Checkbox.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import SelectItem from "$lib/components/Select/SelectItem.svelte";
	import { theme } from "$lib/utils/themify.svelte.js";
</script>

<div class="SettingsPage">
	<Checkbox
		label="MockBox"
		description="Some description for this option"
	></Checkbox>
	<Checkbox
		label="MockBox"
		description="Some description for this option"
	></Checkbox>
	<Checkbox
		label="MockBox"
		description="Some description for this option"
	></Checkbox>
	<div class="option">
		<h4>Padding</h4>
		<Select
			onchange={(e) => {
				theme.update((x) => {
					x.padding = e;
					return x;
				});
			}}
			placeholder="Select a fruit..."
			variant="ghost"
		>
			<SelectItem
				value=".25rem"
				label=".25rem"
			/>
			<SelectItem
				value=".5rem"
				label=".5rem"
			/>
			<SelectItem
				value=".75rem"
				label=".75rem"
			/>
			<SelectItem
				value="1rem"
				label="1rem"
			/>
		</Select>
	</div>
	<div class="option">
		<h4>borderRadius</h4>
		<Select
			onchange={(e) => {
				theme.update((x) => {
					x.borderRadius = e;
					return x;
				});
			}}
			placeholder="Select a fruit..."
			variant="ghost"
		>
			<SelectItem
				value=".25rem"
				label=".25rem"
			/>
			<SelectItem
				value=".5rem"
				label=".5rem"
			/>
			<SelectItem
				value=".75rem"
				label=".75rem"
			/>
			<SelectItem
				value="1rem"
				label="1rem"
			/>
		</Select>
	</div>
</div>

<style lang="scss">
	.SettingsPage {
		height: 100%;
		width: max(45vw, 400px);
		display: flex;
		flex-direction: column;
		gap: var(--padding-m);
		padding: var(--padding-l);
		margin-inline: auto;
		margin-block: var(--padding-m);
		border-radius: var(--border-radius-m);
		background-color: var(--foreground-color);
	}
	.option {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
