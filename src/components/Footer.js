import { SITE } from '../site';

export default function Footer({ onToggleTheme }) {
    return (
        <footer>
            <div className="wrap">
                <span>© {SITE.year} {SITE.name} · Built in Accra</span>
                <nav aria-label="Social">
                    <a href={SITE.github} rel="noopener noreferrer" target="_blank">GitHub</a>
                    <a href={SITE.twitter} rel="noopener noreferrer" target="_blank">Twitter</a>
                    <a href={`mailto:${SITE.email}`}>Email</a>
                    <button className="lnk" id="theme" type="button" onClick={onToggleTheme}>Switch theme</button>
                    <a href="#banner">Back to top</a>
                </nav>
            </div>
        </footer>
    );
}
