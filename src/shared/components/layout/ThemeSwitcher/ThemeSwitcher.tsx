'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/core/theme';
import { cn } from '@/shared/utils/helpers';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
    const { theme, themeKey, setTheme, availableThemes, colorMode, setColorMode, resolvedColorMode } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Tema seç"
                aria-expanded={isOpen}
            >
                <span
                    className={styles.colorDot}
                    style={{ backgroundColor: theme.colors[resolvedColorMode].primary }}
                />
                <span className={styles.themeName}>{theme.name}</span>
                <svg
                    className={cn(styles.arrow, isOpen && styles.arrowOpen)}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Tema</span>
                        {Object.values(availableThemes).map((t) => (
                            <button
                                key={t.key}
                                className={cn(styles.option, themeKey === t.key && styles.selected)}
                                onClick={() => {
                                    setTheme(t.key);
                                    setIsOpen(false);
                                }}
                            >
                                <span
                                    className={styles.colorDot}
                                    style={{ backgroundColor: t.colors[resolvedColorMode].primary }}
                                />
                                <span>{t.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Görünüm</span>
                        <div className={styles.colorModes}>
                            <button
                                className={cn(styles.colorModeBtn, colorMode === 'light' && styles.selected)}
                                onClick={() => setColorMode('light')}
                                aria-label="Açık mod"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            </button>
                            <button
                                className={cn(styles.colorModeBtn, colorMode === 'dark' && styles.selected)}
                                onClick={() => setColorMode('dark')}
                                aria-label="Koyu mod"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            </button>
                            <button
                                className={cn(styles.colorModeBtn, colorMode === 'system' && styles.selected)}
                                onClick={() => setColorMode('system')}
                                aria-label="Sistem"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
