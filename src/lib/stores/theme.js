import { writable } from "svelte/store";
import { browser } from "$app/environment";

/** @typedef {"red" | "green" | "blue" | "violet" | "purple"} ThemeName */

/** @type {ReadonlyArray<ThemeName>} */
export const THEMES = ["red", "green", "blue", "violet", "purple"];

/** @param {string | null} value */
function isTheme(value) {
  return value !== null && THEMES.includes(/** @type {ThemeName} */ (value));
}

function createTheme() {
  const stored = browser ? localStorage.getItem("portfolio-theme") : null;

  /** @type {ThemeName} */
  const initial = isTheme(stored) ? /** @type {ThemeName} */ (stored) : "red";

  const { subscribe, set } = writable(initial);

  /** @param {ThemeName} value */
  function applyTheme(value) {
    if (!browser) return;

    document.documentElement.classList.remove(
      "theme-red",
      "theme-green",
      "theme-blue",
      "theme-violet",
      "theme-purple",
      "dark",
      "light",
    );

    document.documentElement.classList.add(`theme-${value}`);
    localStorage.setItem("portfolio-theme", value);
  }

  return {
    subscribe,

    /** @param {ThemeName} value */
    setTheme(value) {
      if (!isTheme(value)) return;
      set(value);
      applyTheme(value);
    },

    next() {
      const storedTheme = browser
        ? localStorage.getItem("portfolio-theme")
        : null;

      /** @type {ThemeName} */
const current = isTheme(storedTheme)
  ? /** @type {ThemeName} */ (storedTheme)
  : initial;
      const index = THEMES.indexOf(current);
      /** @type {ThemeName} */
const nextTheme = THEMES[(index + 1) % THEMES.length];

      set(nextTheme);
      applyTheme(nextTheme);
    },

    init() {
      applyTheme(initial);
    },
  };
}

export const theme = createTheme();