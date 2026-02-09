/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            // If valid theme, return it. Otherwise default to system
            if (savedTheme === "dark" || savedTheme === "light" || savedTheme === "system") {
                return savedTheme;
            }
        }
        return "system";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        function applyTheme() {
            let isDark = false;

            if (theme === "system") {
                isDark = mediaQuery.matches;
            } else {
                isDark = theme === "dark";
            }

            // Only toggle the `dark` class. Do not add a `light` class – Tailwind
            // uses the presence of `dark` on the root element.
            if (isDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }

        applyTheme();

        // Listen for system changes
        const handleChange = () => {
            if (theme === "system") {
                applyTheme();
            }
        };

        // Modern browsers
        mediaQuery.addEventListener("change", handleChange);

        // Save to localStorage
        localStorage.setItem("theme", theme);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [theme]);

    const setThemeAndSave = (newTheme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setThemeAndSave }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}
