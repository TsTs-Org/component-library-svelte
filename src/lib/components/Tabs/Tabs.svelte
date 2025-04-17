<script
	lang="ts"
	module
>
	const KEY = Symbol();

	export class TabState {
		tabState: Set<string> = $state(new SvelteSet());

		constructor() {
			setContext(KEY, this);
		}

		static get(): TabState {
			return getContext(KEY);
		}

		setVisibility(tabIdentifier: string, state: boolean): void {
			// TODO: this could be the place to hook into for multiple tabs at once

			this.#handleTabStateChangeSingularTabArea(tabIdentifier, state);
		}

		#handleTabStateChangeSingularTabArea(tabIdentifier: string, state: boolean): void {
			if (state) {
				this.tabState.clear();
				this.tabState.add(tabIdentifier);
			} else {
				this.tabState.clear();
				this.tabState.delete(tabIdentifier);
			}
		}
	}
</script>

<script lang="ts">
	import { getContext, setContext, type Snippet } from "svelte";
	import { SvelteSet } from "svelte/reactivity";

	// TODO: typing that ensures that there is a 'TabContent' for every 'TabTrigger'

	// TODO: add option for default tab

	// TODO: add pre-styled tab triggers (-> as block?)

	type Props = { children: Snippet };
	let { children }: Props = $props();

	new TabState();
</script>

{@render children?.()}
