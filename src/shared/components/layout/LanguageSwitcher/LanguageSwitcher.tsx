'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, localeFlags, Locale } from '@/core/i18n';
import { cn } from '@/shared/utils/helpers';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();
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

    const handleLocaleChange = (newLocale: Locale) => {
        const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
        router.push(`/${newLocale}${pathWithoutLocale}`);
        setIsOpen(false);
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Dil seç"
                aria-expanded={isOpen}
            >
                <span className={styles.flag}>{localeFlags[locale]}</span>
                <span className={styles.localeName}>{localeNames[locale]}</span>
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
                    {locales.map((l) => (
                        <button
                            key={l}
                            className={cn(styles.option, locale === l && styles.selected)}
                            onClick={() => handleLocaleChange(l)}
                        >
                            <span className={styles.flag}>{localeFlags[l]}</span>
                            <span>{localeNames[l]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
