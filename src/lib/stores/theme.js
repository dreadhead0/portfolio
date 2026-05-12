import { writable } from "svelte/store";
import { browser } from "$app/environment";

function createTheme() {
  const stored = browser ? localStorage.getItem("portfolio-theme") : null;
  const initial = stored || "dark";
  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    toggle() {
      update((t) => {
        const next = t === "dark" ? "light" : "dark";
        if (browser) {
          localStorage.setItem("portfolio-theme", next);
          document.documentElement.classList.toggle("dark", next === "dark");
          document.documentElement.classList.toggle("light", next === "light");
        }
        return next;
      });
    },
    init() {
      if (browser) {
        document.documentElement.classList.toggle("dark", initial === "dark");
        document.documentElement.classList.toggle("light", initial === "light");
      }
    },
  };
}

export const theme = createTheme();
