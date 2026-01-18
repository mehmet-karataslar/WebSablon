// Theme definitions for multi-sector support
export type ThemeKey = 'default' | 'automotive' | 'realEstate' | 'gym' | 'clinic';

export interface ThemeColors {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    background: string;
    backgroundAlt: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textMuted: string;
    textInverse: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}

export interface Theme {
    key: ThemeKey;
    name: string;
    description: string;
    colors: {
        light: ThemeColors;
        dark: ThemeColors;
    };
}

export const themes: Record<ThemeKey, Theme> = {
    default: {
        key: 'default',
        name: 'Varsayılan',
        description: 'Genel amaçlı modern tema',
        colors: {
            light: {
                primary: '#3b82f6',
                primaryHover: '#2563eb',
                secondary: '#6366f1',
                secondaryHover: '#4f46e5',
                background: '#ffffff',
                backgroundAlt: '#f8fafc',
                surface: '#ffffff',
                surfaceHover: '#f1f5f9',
                text: '#1e293b',
                textMuted: '#64748b',
                textInverse: '#ffffff',
                border: '#e2e8f0',
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#0ea5e9',
            },
            dark: {
                primary: '#60a5fa',
                primaryHover: '#3b82f6',
                secondary: '#818cf8',
                secondaryHover: '#6366f1',
                background: '#0f172a',
                backgroundAlt: '#1e293b',
                surface: '#1e293b',
                surfaceHover: '#334155',
                text: '#f1f5f9',
                textMuted: '#94a3b8',
                textInverse: '#0f172a',
                border: '#334155',
                success: '#4ade80',
                warning: '#fbbf24',
                error: '#f87171',
                info: '#38bdf8',
            },
        },
    },
    automotive: {
        key: 'automotive',
        name: 'Otomotiv',
        description: 'Araç galerileri için güçlü ve dinamik tema',
        colors: {
            light: {
                primary: '#dc2626',
                primaryHover: '#b91c1c',
                secondary: '#1f2937',
                secondaryHover: '#111827',
                background: '#ffffff',
                backgroundAlt: '#f9fafb',
                surface: '#ffffff',
                surfaceHover: '#f3f4f6',
                text: '#111827',
                textMuted: '#6b7280',
                textInverse: '#ffffff',
                border: '#e5e7eb',
                success: '#16a34a',
                warning: '#d97706',
                error: '#dc2626',
                info: '#2563eb',
            },
            dark: {
                primary: '#f87171',
                primaryHover: '#ef4444',
                secondary: '#9ca3af',
                secondaryHover: '#d1d5db',
                background: '#111827',
                backgroundAlt: '#1f2937',
                surface: '#1f2937',
                surfaceHover: '#374151',
                text: '#f9fafb',
                textMuted: '#9ca3af',
                textInverse: '#111827',
                border: '#374151',
                success: '#4ade80',
                warning: '#fbbf24',
                error: '#f87171',
                info: '#60a5fa',
            },
        },
    },
    realEstate: {
        key: 'realEstate',
        name: 'Gayrimenkul',
        description: 'Emlak portalları için güvenilir ve profesyonel tema',
        colors: {
            light: {
                primary: '#059669',
                primaryHover: '#047857',
                secondary: '#0d9488',
                secondaryHover: '#0f766e',
                background: '#ffffff',
                backgroundAlt: '#f0fdf4',
                surface: '#ffffff',
                surfaceHover: '#ecfdf5',
                text: '#1e293b',
                textMuted: '#64748b',
                textInverse: '#ffffff',
                border: '#d1fae5',
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#0ea5e9',
            },
            dark: {
                primary: '#34d399',
                primaryHover: '#10b981',
                secondary: '#2dd4bf',
                secondaryHover: '#14b8a6',
                background: '#0f1f1a',
                backgroundAlt: '#1a2f28',
                surface: '#1a2f28',
                surfaceHover: '#2a4038',
                text: '#ecfdf5',
                textMuted: '#a7f3d0',
                textInverse: '#0f1f1a',
                border: '#2a4038',
                success: '#4ade80',
                warning: '#fbbf24',
                error: '#f87171',
                info: '#38bdf8',
            },
        },
    },
    gym: {
        key: 'gym',
        name: 'Spor Salonu',
        description: 'Fitness merkezleri için enerjik ve dinamik tema',
        colors: {
            light: {
                primary: '#f97316',
                primaryHover: '#ea580c',
                secondary: '#eab308',
                secondaryHover: '#ca8a04',
                background: '#ffffff',
                backgroundAlt: '#fffbeb',
                surface: '#ffffff',
                surfaceHover: '#fef3c7',
                text: '#1c1917',
                textMuted: '#78716c',
                textInverse: '#ffffff',
                border: '#fed7aa',
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#0ea5e9',
            },
            dark: {
                primary: '#fb923c',
                primaryHover: '#f97316',
                secondary: '#facc15',
                secondaryHover: '#eab308',
                background: '#1c1206',
                backgroundAlt: '#2c1c0a',
                surface: '#2c1c0a',
                surfaceHover: '#422a0f',
                text: '#fef3c7',
                textMuted: '#fcd34d',
                textInverse: '#1c1206',
                border: '#422a0f',
                success: '#4ade80',
                warning: '#fbbf24',
                error: '#f87171',
                info: '#38bdf8',
            },
        },
    },
    clinic: {
        key: 'clinic',
        name: 'Klinik / Sağlık',
        description: 'Sağlık kuruluşları için temiz ve profesyonel tema',
        colors: {
            light: {
                primary: '#0ea5e9',
                primaryHover: '#0284c7',
                secondary: '#38bdf8',
                secondaryHover: '#0ea5e9',
                background: '#ffffff',
                backgroundAlt: '#f0f9ff',
                surface: '#ffffff',
                surfaceHover: '#e0f2fe',
                text: '#0f172a',
                textMuted: '#64748b',
                textInverse: '#ffffff',
                border: '#bae6fd',
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#0ea5e9',
            },
            dark: {
                primary: '#38bdf8',
                primaryHover: '#0ea5e9',
                secondary: '#7dd3fc',
                secondaryHover: '#38bdf8',
                background: '#0c1929',
                backgroundAlt: '#0f2942',
                surface: '#0f2942',
                surfaceHover: '#134166',
                text: '#e0f2fe',
                textMuted: '#7dd3fc',
                textInverse: '#0c1929',
                border: '#134166',
                success: '#4ade80',
                warning: '#fbbf24',
                error: '#f87171',
                info: '#7dd3fc',
            },
        },
    },
};

export const defaultTheme: ThemeKey = 'default';
