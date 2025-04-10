import { writable } from "svelte/store";

// --- New Code

export function mountTheme() {
    const savedTheme: object | undefined = JSON.parse(localStorage.getItem("_theme")!)
    if (savedTheme) {
        theme.set(savedTheme);
    }
    theme.subscribe((x) => {
        document.getElementById("Themify")?.classList.remove(x.lightMode ? "dark-mode" : "light-mode");
        document.getElementById("Themify")?.classList.add(x.lightMode ? "light-mode" : "dark-mode");
        document.documentElement.style.setProperty("--primary-color", x.primaryColor);
        document.documentElement.style.setProperty("--border-radius-s", x.borderRadius);
        document.documentElement.style.setProperty("--padding-s", x.padding);
        document.documentElement.style.setProperty("--color-influence", x.colorInfluence);
        localStorage.setItem("_theme", JSON.stringify(x))
    })
    
}

export const theme = writable({
    lightMode: true,
    primaryColor: "royalblue",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    colorInfluence: "0.01"
})
