import { useCallback, useEffect, useState } from 'react';

// Light/dark theme. Persists choice to localStorage, falls back to
// prefers-color-scheme on first load. Drives [data-theme] on <html>,
// which the CSS tokens in index.css read.
export default function useTheme() {
    const [theme, setTheme] = useState(() => {
        try {
            const t = localStorage.getItem('theme');
            if (t === 'dark' || t === 'light') return t;
        } catch (_) { /* ignore */ }
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem('theme', theme); } catch (_) { /* ignore */ }
    }, [theme]);

    const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
    return [theme, toggle];
}
