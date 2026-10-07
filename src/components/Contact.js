import { SITE } from '../data/site';
import SectionHeader from './SectionHeader';

export default function Contact() {
    return (
        <section id="contact" aria-label="Contact" className="py-16">
            <div className="container-x">
                <SectionHeader index="05" label="Contact" title="Contact" />
                <div className="card p-8 md:p-10 reveal">
                    <p className="text-ink/90 max-w-2xl">
                        Open to full-time roles and contract work. Based in {SITE.location} (GMT),
                        flexible on overlap hours. Usually replies within 24 hours.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a href={`mailto:${SITE.email}`} className="btn btn-primary">
                            Email me
                        </a>
                        <a href={SITE.cvUrl} className="btn btn-secondary" download>
                            Download CV
                        </a>
                        <a href={SITE.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        {SITE.linkedin ? (
                            <a href={SITE.linkedin} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                LinkedIn
                            </a>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
