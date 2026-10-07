import { EXPERIENCE } from '../data/experience';
import SectionHeader from './SectionHeader';
import AdinkraMark from './AdinkraMark';

export default function Experience() {
    return (
        <section id="experience" aria-label="Experience" className="py-16 wm-host">
            <AdinkraMark name="sankofa" className="wm wm-left wm-experience" />
            <div className="container-x">
                <SectionHeader index="02" label="Experience" title="Experience" />
                <ol className="timeline reveal">
                    {EXPERIENCE.map((item, i) => (
                        <li key={i} className="timeline-item">
                            <div className="mono-label text-muted">{item.year || '—'}</div>
                            <h3 className="mt-1 text-lg font-semibold">
                                {item.role}
                                {item.org ? <span className="text-muted font-normal"> · {item.org}</span> : null}
                            </h3>
                            <p className="mt-1 text-muted max-w-2xl">{item.body}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
