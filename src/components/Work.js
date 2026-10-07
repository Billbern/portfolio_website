import { PROJECTS } from '../data/projects';
import ProjectCard from './ProjectCard';
import SectionHeader from './SectionHeader';
import AdinkraMark from './AdinkraMark';

const SPANS = ['work-card-1', 'work-card-2', 'work-card-3', 'work-card-4'];

export default function Work() {
    return (
        <section id="work" aria-label="Selected work" className="py-16 wm-host">
            <AdinkraMark name="nkyinkyim" className="wm wm-right wm-work" />
            <div className="container-x">
                <SectionHeader
                    index="01"
                    label="Selected work"
                    title="Selected work"
                    lead="Shipped projects, newest first. Every card links to a case study and code."
                />
                <div className="work-grid">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.slug} project={p} spanClass={SPANS[i] || 'work-card-3'} />
                    ))}
                </div>
            </div>
        </section>
    );
}
