<script lang="ts">
	import AutoGenerateTriggers from "$lib/components/Tabs/AutoGenerateTriggers.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		additionalContent: Snippet<[stringIdentifier: string]>;
	};

	let { additionalContent }: Props = $props();
</script>

<div class="tab-trigger-collection">
	<AutoGenerateTriggers>
		{#snippet tabTrigger(selectTab, isSelected, tabIdentifier)}
			<div
				class={["tab-trigger", isSelected() ? "tab-trigger--selected" : ""]}
				onclick={selectTab}
				onkeyup={(e) => {
					if (e.key === "Enter") selectTab();
				}}
				role="tab"
				tabindex="0"
			>
				{@render additionalContent?.(tabIdentifier)}
			</div>
		{/snippet}
	</AutoGenerateTriggers>
</div>

<style lang="scss">
	.tab-trigger-collection {
		display: flex;
		text-wrap: nowrap;
		width: 100%;
		--gap-between-triggers: 0.5rem;
		gap: var(--gap-between-triggers);
	}

	.tab-trigger {
		flex-grow: 1;
		flex-shrink: 1;
		display: flex;
		justify-content: space-between;
		position: relative;

		border-radius: var(--border-radius-s);
		padding: var(--padding-xs);

		&:not(&--selected):hover {
			cursor: pointer;
			background-color: var(--hover-color);
		}

		&--selected {
			background-color: var(--neutral-400);
		}

		&:not(:last-child, &--selected, :has(+ &--selected))::after {
			display: block;
			width: 2px;
			border-radius: 2px;
			height: 50%;
			top: 50%;
			right: calc(-1 * var(--gap-between-triggers) / 2);
			translate: -50% -50%;

			position: absolute;
			background-color: var(--neutral-400);
			content: "";
			cursor: default;
			pointer-events: none;
		}
	}
</style>
