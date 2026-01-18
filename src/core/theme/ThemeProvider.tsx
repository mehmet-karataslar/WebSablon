'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { themes, defaultTheme, ThemeKey, Theme } from './themes';

type ColorMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    themeKey: ThemeKey;
    colorMode: ColorMode;
    resolvedColorMode: 'light' | 'dark';
    setTheme: (key: ThemeKey) => void;
    setColorMode: (mode: ColorMode) => void;
    availableThemes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'web-sablon-theme';
const COLOR_MODE_STORAGE_KEY = 'web-sablon-color-mode';

function getSystemColorMode(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeToDOM(theme: Theme, colorMode: 'light' | 'dark') {
    const root = document.documentElement;
    const colors = theme.colors[colorMode];

    // Apply CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
        const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVar, value);
    });

    // Set color mode class
    root.classList.remove('light', 'dark');
    root.classList.add(colorMode);
    root.setAttribute('data-theme', theme.key);
    root.setAttribute('data-color-mode', colorMode);
}

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultThemeKey?: ThemeKey;
    defaultColorMode?: ColorMode;
}

export function ThemeProvider({
    children,
    defaultThemeKey = defaultTheme,
    defaultColorMode = 'system',
}: ThemeProviderProps) {
    const [themeKey, setThemeKey] = useState<ThemeKey>(defaultThemeKey);
    const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
    const [resolvedColorMode, setResolvedColorMode] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Initialize from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeKey | null;
        const savedColorMode = localStorage.getItem(COLOR_MODE_STORAGE_KEY) as ColorMode | null;

        if (savedTheme && themes[savedTheme]) {
            setThemeKey(savedTheme);
        }
        if (savedColorMode) {
            setColorModeState(savedColorMode);
        }
        setMounted(true);
    }, []);

    // Resolve color mode and apply theme
    useEffect(() => {
        if (!mounted) return;

        const resolved = colorMode === 'system' ? getSystemColorMode() : colorMode;
        setResolvedColorMode(resolved);
        applyThemeToDOM(themes[themeKey], resolved);

        // Listen for system color mode changes
        if (colorMode === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => {
                const newMode = e.matches ? 'dark' : 'light';
                setResolvedColorMode(newMode);
                applyThemeToDOM(themes[themeKey], newMode);
            };
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [themeKey, colorMode, mounted]);

    const setTheme = useCallback((key: ThemeKey) => {
        setThemeKey(key);
        localStorage.setItem(THEME_STORAGE_KEY, key);
    }, []);

    const setColorMode = useCallback((mode: ColorMode) => {
        setColorModeState(mode);
        localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
    }, []);

    const value: ThemeContextType = {
        theme: themes[themeKey],
        themeKey,
        colorMode,
        resolvedColorMode,
        setTheme,
        setColorMode,
        availableThemes: themes,
    };

    // Always provide context, but hide content until mounted to prevent flash
    return (
        <ThemeContext.Provider value={value}>
            {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
