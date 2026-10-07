import { SITE } from '../data/site';

export default function Footer({ theme, onToggleTheme }) {
    return (
        <footer className="border-t border-border mt-12" role="contentinfo">
            <div className="container-x py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-sm text-muted">
                <p>
                    © {new Date().getFullYear()} {SITE.name} · Built in Accra
                </p>
                <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
        </footer>
    );
}
