import { HIGHLIGHTS } from '../data/highlights';
import SectionHeader from './SectionHeader';

export default function Highlights() {
    return (
        <section aria-label="Highlights" className="py-16">
            <div className="container-x">
                <SectionHeader index="03" label="Highlights" title="Highlights" />
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
                    {HIGHLIGHTS.map((h) => (
                        <li key={h.idx} className="card p-6">
                            <div className="mono-label text-accent">{h.idx}</div>
                            <p className="mt-3 text-base">
                                {h.label}
                                {h.value ? <span className="text-muted"> · {h.value}</span> : null}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
