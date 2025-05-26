<script
	lang="ts"
	module
>
	import "$lib/styles/main.css";
	import "$lib/styles/theme.css";
	import "$lib/styles/charts.css";
	import { writable } from "svelte/store";

	const themeValues = [
		"background_color",
		"foreground_color",
		"text_color",
		"text_color_muted",
		"text_color_inverted",
		"border_color",
		"hover_color",
		"neutral_hover_color",
	];

	const modeValues = {
		lightValues: {
			background_color: "var(--neutral-100)",
			foreground_color: "var(--neutral-200)",
			text_color: "var(--neutral-800)",
			text_color_muted: "var(--neutral-500)",
			text_color_inverted: "var(--neutral-200)",
			border_color: "var(--neutral-400)",
			hover_color: "var(--neutral-300)",
			neutral_hover_color: "var(--neutral-400)",
		},
		darkValues: {
			background_color: "var(--neutral-900)",
			foreground_color: "var(--neutral-800)",
			text_color: "var(--neutral-200)",
			text_color_muted: "var(--neutral-300)",
			text_color_inverted: "var(--neutral-200)",
			border_color: "var(--neutral-600)",
			hover_color: "var(--neutral-600)",
			neutral_hover_color: "var(--neutral-700)",
		},
	};

	const defaults = {
		lightMode: true,
		primaryColor: "royalblue",
		padding: "0.75rem",
		borderRadius: "0.5rem",
		colorInfluence: "0.01",
		fontSize: "1rem",
		...modeValues,
	};

	export function setGeneralTheme(
		lightMode: boolean,
		primaryColor: string,
		padding: string,
		borderRadius: string,
		colorInfluence: string,
		fontSize: string
	) {
		const newTheme = {
			lightMode,
			primaryColor,
			padding,
			borderRadius,
			colorInfluence,
			fontSize,
			...modeValues,
		};
		console.log(newTheme);
		theme.set(newTheme);
	}

	export const theme = writable(defaults);

	function applyTheme(themeObj: any) {
		const values = themeObj.lightMode ? themeObj.lightValues : themeObj.darkValues;

		themeValues.forEach((key) => {
			const cssVar = `--${key.replaceAll("_", "-")}`;
			document.documentElement.style.setProperty(cssVar, values[key] ?? "red");
		});

		document.documentElement.style.setProperty(
			"--primary-color",
			themeObj.primaryColor ?? defaults.primaryColor
		);
		document.documentElement.style.setProperty(
			"--border-radius-s",
			themeObj.borderRadius ?? defaults.borderRadius
		);
		document.documentElement.style.setProperty("--padding-s", themeObj.padding ?? defaults.padding);
		document.documentElement.style.setProperty(
			"--color-influence",
			themeObj.colorInfluence ?? defaults.colorInfluence
		);
		document.documentElement.style.setProperty(
			"--text-size-s",
			themeObj.fontSize ?? defaults.fontSize
		);
	}

	// export const jsColors = writable({
	// 	primary: "",
	// 	hover: "",
	// 	border: "",
	// });

	function mountTheme() {
		const savedTheme = JSON.parse(localStorage.getItem("_theme") ?? "null");
		if (savedTheme) {
			theme.set(savedTheme);
		}

		theme.subscribe((t) => {
			applyTheme(t);
			localStorage.setItem("_theme", JSON.stringify(t));

			// let styles: CSSStyleDeclaration | undefined = undefined;
			// styles = getComputedStyle(document.documentElement);

			// jsColors.update((curr) => {
			// 	curr.primary = styles?.getPropertyValue(`--primary-${5}00`).trim();
			// 	curr.hover = styles?.getPropertyValue("--hover-color").trim();
			// 	curr.border = styles?.getPropertyValue("--border-color").trim();
			// 	console.log(curr);
			// 	return curr;
			// });
		});
	}

	if (typeof window !== "undefined") {
		mountTheme();
	}
</script>

<svelte:head>
	<script>
		(() => {
			const themeValues = [
				"background_color",
				"foreground_color",
				"text_color",
				"text_color_muted",
				"text_color_inverted",
				"border_color",
				"hover_color",
				"neutral_hover_color",
			];
			const defaults = {
				lightMode: true,
				primaryColor: "royalblue",
				padding: "0.75rem",
				borderRadius: "0.5rem",
				colorInfluence: "0.01",
				fontSize: "1rem",
				lightValues: {
					background_color: "var(--neutral-100)",
					foreground_color: "var(--neutral-200)",
					text_color: "var(--neutral-800)",
					text_color_muted: "var(--neutral-500)",
					text_color_inverted: "var(--neutral-200)",
					border_color: "var(--neutral-400)",
					hover_color: "var(--neutral-400)",
					neutral_hover_color: "var(--neutral-400)",
				},
				darkValues: {
					background_color: "var(--neutral-900)",
					foreground_color: "var(--neutral-800)",
					text_color: "var(--neutral-200)",
					text_color_muted: "var(--neutral-300)",
					text_color_inverted: "var(--neutral-200)",
					border_color: "var(--neutral-600)",
					hover_color: "var(--neutral-600)",
					neutral_hover_color: "var(--neutral-700)",
				},
			};
			const saved = JSON.parse(localStorage.getItem("_theme") ?? "null") ?? defaults;
			const values = saved.lightMode ? saved.lightValues : saved.darkValues;

			themeValues.forEach((key) => {
				document.documentElement.style.setProperty(
					`--${key.replaceAll("_", "-")}`,
					values[key] ?? "red"
				);
			});
			document.documentElement.style.setProperty(
				"--primary-color",
				saved.primaryColor ?? defaults.primaryColor
			);
			document.documentElement.style.setProperty(
				"--border-radius-s",
				saved.borderRadius ?? defaults.borderRadius
			);
			document.documentElement.style.setProperty("--padding-s", saved.padding ?? defaults.padding);
			document.documentElement.style.setProperty(
				"--color-influence",
				saved.colorInfluence ?? defaults.colorInfluence
			);
			document.documentElement.style.setProperty(
				"--text-size-s",
				saved.fontSize ?? defaults.fontSize
			);
		})();
	</script>
</svelte:head>
