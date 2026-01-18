import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/core/i18n/config';

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
});

export const config = {
    matcher: ['/', '/(tr|en)/:path*'],
};
