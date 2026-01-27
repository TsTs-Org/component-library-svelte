<script
	lang="ts"
	module
>
	const KEY = Symbol(); // this could also be just "TabState" as there probably won't be another component with the same naming

	export class TabState {
		private registeredTabs: string[] = $state([]);
		private visibleTabs: Set<string> = $state(new SvelteSet());

		constructor(defaultTab?: string) {
			if (!!defaultTab) this.visibleTabs.add(defaultTab);
			setContext(KEY, this);
		}

		static get(): TabState {
			return getContext(KEY);
		}

		registerTab(tabIdentifierToAdd: string): void {
			if (this.registeredTabs.includes(tabIdentifierToAdd)) return;
			this.registeredTabs.push(tabIdentifierToAdd);
		}

		unregisterTab(tabIdentifierToRemove: string): void {
			this.registeredTabs = this.registeredTabs.filter((tab) => tab !== tabIdentifierToRemove);
		}

		setVisibility(tabIdentifier: string, state: boolean): void {
			// TODO: this could be the place to hook into for multiple tabs at once

			this.#handleTabStateChangeSingularTabArea(tabIdentifier, state);
		}

		#handleTabStateChangeSingularTabArea(tabIdentifier: string, state: boolean): void {
			if (state) {
				this.visibleTabs.clear();
				this.visibleTabs.add(tabIdentifier);
			} else {
				this.visibleTabs.clear();
				this.visibleTabs.delete(tabIdentifier);
			}
		}
	}
</script>

<script lang="ts">
	import { getContext, setContext, type Snippet } from "svelte";
	import { SvelteSet } from "svelte/reactivity";

	// FIXME: add option to save context for 'minimized' tabs (e.g. tabs in tab not saving state when switching tabs)

	type Props = { defaultTab?: string; children: Snippet };
	let { defaultTab, children }: Props = $props();

	new TabState(defaultTab);
</script>

{@render children?.()}
