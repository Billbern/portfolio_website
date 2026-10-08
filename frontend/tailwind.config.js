// Tailwind theme aligned with the spec's design tokens.
// Colors use CSS variables so the light/dark theme switch is one attribute flip.
// Generated utilities (text-ink-muted-500 etc.) read at runtime via var().
module.exports = {
    purge: ['./src/**/*.{js,jsx}'],
    darkMode: false, // we handle theme manually via data-theme on <html>
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                surface: 'var(--surface)',
                'surface-2': 'var(--surface-2)',
                border: 'var(--border)',
                ink: 'var(--text)',
                muted: 'var(--muted)',
                accent: 'var(--accent)',
                'accent-ink': 'var(--accent-ink)',
                ok: 'var(--ok)',
            },
            fontFamily: {
                display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            maxWidth: {
                container: '1160px',
            },
            borderRadius: {
                card: '16px',
            },
            letterSpacing: {
                tightish: '-0.02em',
                mono: '0.14em',
            },
        },
    },
    plugins: [],
};
