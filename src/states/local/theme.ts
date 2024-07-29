import { getItem, setItem } from "@/lib";
import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

const getStoredTheme = (): "light" | "dark" => {
  const storedTheme = getItem("theme");
  return storedTheme === "dark" ? "dark" : "light";
};

const useThemeStore = create<ThemeState>((set) => ({
  theme: getStoredTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      setItem("theme", newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme) => {
    setItem("theme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
