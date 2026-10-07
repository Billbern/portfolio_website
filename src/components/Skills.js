import { SKILL_GROUPS } from '../data/skills';
import SectionHeader from './SectionHeader';

// 04 · Skills — grouped columns of canonical-named chips.
// Spec: NO skill bars, no percentages.
export default function Skills() {
    return (
        <section id="skills" aria-label="Skills" className="py-16">
            <div className="container-x">
                <SectionHeader
                    index="04"
                    label="Skills"
                    title="Skills"
                    lead="The stack I reach for — and where I'm heading."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 reveal">
                    {SKILL_GROUPS.map((g) => (
                        <div key={g.title}>
                            <div className="mono-label text-muted">{g.title}</div>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {g.items.map((item) => (
                                    <li key={item} className="tag">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
