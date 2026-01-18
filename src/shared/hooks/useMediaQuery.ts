'use client';

import { useState, useEffect, useCallback } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<Breakpoint, number> = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export function useBreakpoint(): Breakpoint {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>('xs');

    const updateBreakpoint = useCallback(() => {
        const width = window.innerWidth;
        if (width >= breakpoints['2xl']) {
            setBreakpoint('2xl');
        } else if (width >= breakpoints.xl) {
            setBreakpoint('xl');
        } else if (width >= breakpoints.lg) {
            setBreakpoint('lg');
        } else if (width >= breakpoints.md) {
            setBreakpoint('md');
        } else if (width >= breakpoints.sm) {
            setBreakpoint('sm');
        } else {
            setBreakpoint('xs');
        }
    }, []);

    useEffect(() => {
        updateBreakpoint();
        window.addEventListener('resize', updateBreakpoint);
        return () => window.removeEventListener('resize', updateBreakpoint);
    }, [updateBreakpoint]);

    return breakpoint;
}

export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet(): boolean {
    return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
    return useMediaQuery('(min-width: 1024px)');
}
