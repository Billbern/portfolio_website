import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';

const CASES = {
    'social-network-prototype': {
        meta: '[2024] · FULLSTACK · SOLO',
        title: 'Social Network prototype',
        problem:
            'A scoped fullsocial prototype demonstrated the breadth of a normal web app: authentication, public feeds, posts, comments, and a content graph that maps cleanly to a relational schema.',
        constraints: [
            'Single developer, build it without a backend-as-a-service',
            'Normalized PostgreSQL schema for users, posts, comments, likes, follows',
            'Flask REST API with session-based auth',
            'Browser-only frontend with semantic HTML and plain CSS',
        ],
        tradeoffs: [
            'Chose Flask over Django to keep the request pipeline small and explicit',
            'Normalized to 3NF and accepted more query joins to keep writes simple',
            'Hand-rolled CSS instead of a framework to keep the bundle small',
        ],
        outcome:
            'A working prototype with public feeds, post detail pages, and a complete comment thread — built end to end by one developer.',
        differently:
            'I would adopt Tailwind CSS earlier in the project to keep visual iteration fast, and reach for Django admin to seed content during testing.',
    },
};

// Generic stub for projects that don't have a worked case study yet.
const STUB = (project) => ({
    meta: `${project.year || '—'} · ${project.role} · ${project.team}`,
    title: project.title,
    problem: 'Case study coming soon. This page will be filled with a detailed write-up.',
    constraints: ['TBD'],
    tradeoffs: ['TBD'],
    outcome: 'TBD',
    differently: 'TBD',
});

export default function CaseStudy({ match }) {
    const slug = match.params.slug;
    const project = PROJECTS.find((p) => p.slug === slug);
    if (!project) return (
        <div className="container-x py-16">
            <h1 className="h2-section">Project not found</h1>
            <p className="mt-4 text-muted">
                <Link to="/" className="text-accent hover:opacity-80">← Back to home</Link>
            </p>
        </div>
    );
    const data = CASES[slug] || STUB(project);

    return (
        <article className="container-x py-16 max-w-3xl">
            <Link to="/#work" className="text-muted hover:text-ink text-sm">← Back to work</Link>
            <p className="mono-label text-muted mt-6">{data.meta.toUpperCase()}</p>
            <h1 className="h2-section mt-2">{data.title}</h1>
            <figure className="mt-6">
                <div className={`browser-frame bg-hue-${project.bgHue}`}>
                    <div className="bar"><i /><i /><i /></div>
                    <div className="thumb">
                        <img src={project.img} alt={`${project.title} — screenshot`} loading="lazy" />
                    </div>
                </div>
            </figure>

            <Section label="Problem" body={data.problem} />
            <Section label="Constraints" items={data.constraints} />
            <Section label="Decisions & tradeoffs" items={data.tradeoffs} />
            <Section label="Outcome" body={data.outcome} />
            <Section label="What I'd do differently" body={data.differently} />

            <footer className="mt-10 pt-6 border-t border-border flex flex-wrap items-center gap-4">
                {project.code ? (
                    <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        View code
                    </a>
                ) : null}
                {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Live demo
                    </a>
                ) : null}
            </footer>
        </article>
    );
}

function Section({ label, body, items }) {
    return (
        <section className="mt-8">
            <h2 className="mono-label text-muted">{label.toUpperCase()}</h2>
            {body ? <p className="mt-3 text-ink/90 leading-relaxed">{body}</p> : null}
            {items ? (
                <ul className="mt-3 list-disc list-inside text-ink/90 space-y-1">
                    {items.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
            ) : null}
        </section>
    );
}
