'use client';

import React from 'react';
import { ThemeProvider } from '@/core/theme';
import { Header, Footer } from '@/shared/components/layout';

interface ClientProvidersProps {
    children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <ThemeProvider>
            <Header />
            <main>{children}</main>
            <Footer />
        </ThemeProvider>
    );
}
