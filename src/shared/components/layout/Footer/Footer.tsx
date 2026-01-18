import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Footer.module.css';

export interface FooterProps {
    siteName?: string;
}

export function Footer({ siteName = 'Web Şablon' }: FooterProps) {
    const t = useTranslations('footer');
    const tNav = useTranslations('nav');
    const locale = useLocale();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <Link href={`/${locale}`} className={styles.logo}>
                            {siteName}
                        </Link>
                        <p className={styles.description}>
                            Modern, çok amaçlı web iskeleti. Farklı sektörlere kolayca uyarlanabilir.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>{tNav('menu')}</h4>
                        <nav className={styles.links}>
                            <Link href={`/${locale}`}>{tNav('home')}</Link>
                            <Link href={`/${locale}/about`}>{tNav('about')}</Link>
                            <Link href={`/${locale}/services`}>{tNav('services')}</Link>
                            <Link href={`/${locale}/contact`}>{tNav('contact')}</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>{tNav('contact')}</h4>
                        <address className={styles.contact}>
                            <p>info@example.com</p>
                            <p>+90 (555) 123 45 67</p>
                        </address>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        {t('copyright', { year: currentYear })}
                    </p>
                    <div className={styles.legal}>
                        <Link href={`/${locale}/privacy`}>{t('privacyPolicy')}</Link>
                        <Link href={`/${locale}/terms`}>{t('termsOfService')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
