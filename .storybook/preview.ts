import type { Preview } from "@storybook/sveltekit";

import "../src/lib/styles/main.css";
import "../src/lib/styles/theme.css";

import { setGeneralTheme } from "../src/lib/components/Themify.svelte";
setGeneralTheme(true, "royalblue", ".75rem", ".5rem", ".01", "1rem");

const preview: Preview = {
	parameters: {
		docs: {
			codePanel: true,
		},
		controls: {
			matchers: {
				date: /Date$/i,
			},
		},
	},
};

export default preview;
