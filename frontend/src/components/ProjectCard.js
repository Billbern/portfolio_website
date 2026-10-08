import { Link } from 'react-router-dom';

function GitHubIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.04c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
        </svg>
    );
}

function ArrowRight() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );
}

// Single project card with browser-chrome 16:10 thumbnail, per-project
// tinted background, meta/title/summary/tags/links.
export default function ProjectCard({ project, spanClass }) {
    const meta = [project.year || '—', project.role, project.team].filter(Boolean).join(' · ');
    return (
        <article className={`card reveal ${spanClass}`}>
            <div className={`browser-frame bg-hue-${project.bgHue}`} aria-hidden="true">
                <div className="bar"><i /><i /><i /></div>
                <div className="thumb">
                    <img
                        src={project.img}
                        alt={`${project.title} — screenshot`}
                        className="thumb-img"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="p-5 md:p-6">
                <p className="mono-label text-muted">{meta}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tightish">{project.title}</h3>
                <p className="mt-2 text-muted text-sm">{project.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                    {project.tags.map((t) => (
                        <li key={t} className="tag">{t}</li>
                    ))}
                </ul>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                    {project.caseStudy ? (
                        <Link
                            to={`/work/${project.slug}`}
                            className="inline-flex items-center gap-1 text-accent hover:opacity-80"
                        >
                            Case study <ArrowRight />
                        </Link>
                    ) : (
                        <Link
                            to={`/work/${project.slug}`}
                            className="inline-flex items-center gap-1 text-accent hover:opacity-80"
                        >
                            Case study <ArrowRight />
                        </Link>
                    )}
                    {project.code ? (
                        <a
                            href={project.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-muted hover:text-ink"
                        >
                            <GitHubIcon /> Code
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
