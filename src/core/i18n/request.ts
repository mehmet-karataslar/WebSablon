import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming locale is valid
    if (!locale || !locales.includes(locale as Locale)) {
        locale = defaultLocale;
    }

    // Load common messages
    const commonMessages = (await import(`./locales/${locale}.json`)).default;

    // Try to load feature-specific messages and merge them
    let messages = { ...commonMessages };

    // Feature modules can add their own translations
    const featureModules = ['vehicles', 'realEstate'];

    for (const feature of featureModules) {
        try {
            const featureMessages = (
                await import(`@/features/${feature}/locales/${locale}.json`)
            ).default;
            messages = { ...messages, [feature]: featureMessages };
        } catch {
            // Feature messages not found, skip
        }
    }

    return {
        locale,
        messages,
    };
});
