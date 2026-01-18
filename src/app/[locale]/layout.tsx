import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/core/theme';
import { Header, Footer } from '@/shared/components/layout';
import '@/core/theme/theme.css';

export const metadata: Metadata = {
    title: 'Web Şablon',
    description: 'Çok amaçlı web iskeleti',
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
