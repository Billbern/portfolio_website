import { useState } from 'react';
import { SITE } from '../data/site';
import useLocalTime from '../hooks/useLocalTime';

function GitHubIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.04c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M4.98 3.5a2.5 2.5 0 1 1-.001 5.001A2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.71h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.34c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.81V21H10V9z" />
        </svg>
    );
}

function CopyIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );
}

export default function Hero() {
    const localTime = useLocalTime(SITE.timezone);
    const [copied, setCopied] = useState(false);

    async function onCopy() {
        try {
            await navigator.clipboard.writeText(SITE.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (_) {
            // Fallback: open a temp textarea and execCommand
            const ta = document.createElement('textarea');
            ta.value = SITE.email; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (__) {}
            document.body.removeChild(ta);
        }
    }

    return (
        <section id="top" aria-label="Hero" className="relative pt-12 pb-16">
            <div className="dot-grid" aria-hidden="true" />
            <div className="container-x relative">
                <div className="card p-8 md:p-10">
                    <div className="flex items-start gap-6">
                        <div
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full grid place-items-center font-display font-bold text-2xl md:text-3xl flex-none"
                            style={{
                                background: 'linear-gradient(140deg, color-mix(in srgb, var(--accent) 80%, white 0%), color-mix(in srgb, var(--accent) 60%, black 20%))',
                                color: 'var(--accent-ink)',
                                boxShadow: 'inset 0 0 0 3px color-mix(in srgb, var(--accent) 90%, white 0%), 0 0 0 1px var(--border)',
                            }}
                            role="img"
                            aria-label={`${SITE.name} monogram`}
                        >
                            {SITE.monogram}
                        </div>
                        <div className="flex-1">
                            <p className="mono-label text-muted">{SITE.role.toUpperCase()} · {SITE.locationShort.toUpperCase()}</p>
                            <h1 className="h1-display mt-2">{SITE.name}</h1>
                            <p className="mt-4 text-ink/90 max-w-2xl">{SITE.valueLine}</p>

                            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Facts">
                                <li className="tag">Building since {SITE.yearFounded}</li>
                                <li className="tag">Open to full-time &amp; contract</li>
                                <li className="tag">Remote-friendly</li>
                                <li className="tag">{SITE.locationShort}</li>
                                <li className="tag" aria-label={`Local time ${localTime} (${SITE.timezone})`}>
                                    GMT · {localTime}
                                </li>
                            </ul>

                            <p className="mt-5 flex items-center gap-2 text-sm">
                                <span className="status-dot" aria-hidden="true" />
                                <span className="text-ok">{SITE.statusOpen}</span>
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <a href={SITE.cvUrl} className="btn btn-primary" download aria-label="Download CV">
                                    Download CV
                                </a>
                                <a href={SITE.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                    <GitHubIcon /> GitHub
                                </a>
                                {SITE.linkedin ? (
                                    <a href={SITE.linkedin} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                        <LinkedInIcon /> LinkedIn
                                    </a>
                                ) : null}
                            </div>

                            <p className="mt-4 flex flex-wrap items-center gap-2 mono-label text-muted">
                                <span>EMAIL</span>
                                <a href={`mailto:${SITE.email}`} className="font-mono normal-case tracking-normal text-ink hover:text-accent">
                                    {SITE.email}
                                </a>
                                <button
                                    type="button"
                                    onClick={onCopy}
                                    className="btn-ghost"
                                    aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
                                >
                                    {copied ? 'Copied ✓' : <><CopyIcon /> Copy</>}
                                </button>
                            </p>

                            <p className="mt-3 text-muted text-sm italic">{SITE.freelanceNote}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
