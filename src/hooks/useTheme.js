import { useCallback, useEffect, useState } from 'react';

// Dark/light theme hook. Persists choice to localStorage and auto-detects
// prefers-color-scheme on first load. Sets `data-theme` on <html>, which the
// moorben.css :root[data-theme="dark"] block uses to swap the palette.
export default function useTheme() {
    const [theme, setTheme] = useState(() => {
        try {
            const t = localStorage.getItem('theme');
            if (t === 'dark' || t === 'light') return t;
        } catch (_) { /* localStorage may be unavailable */ }
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const r = document.documentElement;
        if (theme === 'dark') r.setAttribute('data-theme', 'dark');
        else r.setAttribute('data-theme', 'light');
        try { localStorage.setItem('theme', theme); } catch (_) { /* ignore */ }
    }, [theme]);

    const toggle = useCallback(() => {
        setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    }, []);

    return [theme, toggle];
}
