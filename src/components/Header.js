import { Link } from 'react-router-dom';
import { SITE } from '../data/site';

const NAV = [
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
];

export default function Header({ theme, onToggleTheme }) {
    return (
        <header className="app-header" role="banner">
            <div className="container-x flex items-center justify-between h-16">
                <Link to="/" className="font-display font-bold tracking-tightish text-ink" aria-label="Bernard Abaidoo — home">
                    {SITE.name}
                </Link>
                <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
                    {NAV.map((n) => (
                        <a key={n.id} href={`/#${n.id}`} className="text-muted hover:text-ink transition-colors">
                            {n.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="btn-ghost"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                        {theme === 'dark' ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="12" r="4" />
                                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                            </svg>
                        )}
                    </button>
                    <a
                        href={SITE.cvUrl}
                        className="btn btn-secondary hidden sm:inline-flex"
                        download
                        aria-label="Download CV"
                    >
                        CV
                    </a>
                </div>
            </div>
        </header>
    );
}
