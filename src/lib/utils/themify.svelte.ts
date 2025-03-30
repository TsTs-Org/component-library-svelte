import { writable } from "svelte/store";

export const _mode = writable("");
let primaryColor = $state("");
export function getPrimaryColor() { return primaryColor };

export function setPrimaryColor(color: string) {
    document.documentElement.style.setProperty("--primary-color", color);
    localStorage.setItem("primaryColor", color);
    primaryColor = color;
}

export function getPersistentPrimaryColor(default_color: string) {
    primaryColor = localStorage.getItem("primaryColor") || default_color;
    document.documentElement.style.setProperty("--primary-color", primaryColor);
}

export function switchMode() {
    const mode = localStorage.getItem("mode") === "light-mode" ? "dark-mode" : "light-mode";
    localStorage.setItem("mode", mode);
    _mode.set(mode);
}

export function getPersistentMode(default_mode: string) {
    _mode.set(localStorage.getItem("mode") || default_mode)
}
