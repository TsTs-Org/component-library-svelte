import { writable } from "svelte/store";

export function mountTheme() {
    const savedTheme: object | undefined = JSON.parse(localStorage.getItem("_theme")!)
    if (savedTheme) {
        theme.set(savedTheme);
    }
    theme.subscribe((x) => {
        // document.getElementById("Themify")?.classList.remove(x.lightMode ? "dark-mode" : "light-mode");
        // document.getElementById("Themify")?.classList.add(x.lightMode ? "light-mode" : "dark-mode");
        document.documentElement.style.setProperty("--primary-color", x.primaryColor ?? "royalblue");
        document.documentElement.style.setProperty("--border-radius-s", x.borderRadius ?? ".75rem");
        document.documentElement.style.setProperty("--padding-s", x.padding ?? ".5rem");
        document.documentElement.style.setProperty("--color-influence", x.colorInfluence ?? "0.01");
        document.documentElement.style.setProperty("--text-size-s", x.fontSize ?? "1rem");
        setModeColors(x.lightMode ? (x.lightValues ?? defaults.lightValues) : (x.darkValues ?? defaults.darkValues ));
        localStorage.setItem("_theme", JSON.stringify(x))
    })
}

export const themeValues = [
    "background_color",
    "foreground_color",
    "text_color",
    "text_color_muted",
    "text_color_inverted",
    "border_color",
    "hover_color",
    "neutral_hover_color",
]

export const defaults = {
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
    }
}

export const theme = writable(defaults)

function setModeColors(colors: object) {
    const formatted_keys: string[] = []
    themeValues.map((key) => {
        key = key.replaceAll("_", "-")
        formatted_keys.push(key);
    })
    formatted_keys.forEach((key, i) => {
        document.documentElement.style.setProperty(`--${key}`, colors[themeValues[i]] ?? "red");
    })
}