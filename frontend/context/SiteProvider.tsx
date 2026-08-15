"use client";

import { SiteContext } from "@/context/SiteContext";
import { useState, useEffect } from "react";

export default function SiteProvider({ children }: { children: React.ReactNode }) {
    
    // persistent site-wide state component to share theme and feed view in the app
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);
    const [view, setView] = useState("card");

    // On first load, restores any previously saved preferences from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const savedView = localStorage.getItem("view");
        if (savedTheme) {
            setTheme(savedTheme);
        }
        if (savedView) {
            setView(savedView);
        }
        setMounted(true);
    }, []);

    // If theme preference is dark, applies the dark class to <html> and saves the theme to localStorage
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        if (mounted) {
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    // View mode changes for RSS feed
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("view", view)
        }
    }, [view]);

    return (
        <SiteContext.Provider value={{theme, setTheme, view, setView, mounted, setMounted}}>
            {children}
        </SiteContext.Provider>
    )
}