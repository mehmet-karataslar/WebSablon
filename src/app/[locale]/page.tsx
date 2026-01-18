import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('common');

    return (
        <div className="container">
            <h1>{t('siteName')}</h1>
            <p>Ana sayfa - Placeholder</p>
        </div>
    );
}
