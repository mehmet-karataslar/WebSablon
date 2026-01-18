'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { cn } from '@/shared/utils/helpers';
import styles from './Header.module.css';

interface NavItem {
    label: string;
    href: string;
}

export interface HeaderProps {
    siteName?: string;
    logo?: React.ReactNode;
    navItems?: NavItem[];
}

export function Header({ siteName, logo, navItems }: HeaderProps) {
    const t = useTranslations('nav');
    const locale = useLocale();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const defaultNavItems: NavItem[] = [
        { label: t('home'), href: `/${locale}` },
        { label: t('about'), href: `/${locale}/about` },
        { label: t('services'), href: `/${locale}/services` },
        { label: t('contact'), href: `/${locale}/contact` },
    ];

    const items = navItems || defaultNavItems;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href={`/${locale}`} className={styles.brand}>
                    {logo || <span className={styles.siteName}>{siteName || 'Web Şablon'}</span>}
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    {items.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.navLink}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right side controls */}
                <div className={styles.controls}>
                    <ThemeSwitcher />
                    <LanguageSwitcher />

                    {/* Mobile menu button */}
                    <button
                        className={styles.menuButton}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={t('menu')}
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className={cn(styles.hamburger, mobileMenuOpen && styles.open)}>
                            <span />
                            <span />
                            <span />
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <nav className={styles.mobileNav}>
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.mobileNavLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
