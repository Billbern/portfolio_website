import { SITE } from '../data/site';
import AdinkraMark from './AdinkraMark';

export default function Footer({ theme, onToggleTheme }) {
    return (
        <footer className="border-t border-border mt-12" role="contentinfo">
            <div className="container-x py-8 text-sm text-muted">
                {/* Row 1 — copyright + glyph (left), links (right), baseline-aligned. */}
                <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                    <p className="whitespace-nowrap">
                        © {new Date().getFullYear()} {SITE.name} · Built in Accra{' '}
                        <AdinkraMark name="adinkrahene" className="inline-mark" />
                    </p>
                    <nav aria-label="Footer" className="flex flex-wrap items-baseline gap-x-5 gap-y-2 whitespace-nowrap">
                        <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
                        {SITE.linkedin ? (
                            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
                        ) : null}
                        <a href={`mailto:${SITE.email}`} className="hover:text-ink">Email</a>
                        <a href={SITE.cvUrl} className="hover:text-ink" download>CV</a>
                        <button type="button" onClick={onToggleTheme} className="hover:text-ink">
                            Switch theme
                        </button>
                        <a href="#top" className="hover:text-ink">Back to top</a>
                    </nav>
                </div>
                {/* Row 2 — colophon on its own line, below row 1. */}
                <p className="mt-3 font-mono text-xs text-muted">
                    Adinkra, Ghana — Nkyinkyim · adaptability (Work) · Sankofa · learning from the past (Experience) · Adinkrahene · leadership (Skills) · Dwennimmen · strength with humility (Contact).
                </p>
            </div>
        </footer>
    );
}
