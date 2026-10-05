import { ABOUT, SKILLS, STACKS } from '../data';

// Replaces the template's placeholder "Writing" section with the real
// About / Skills / Stack content from the previous React portfolio.
// Section is anchored by id="skills" so the Profile "Skills" button and
// footer's "Back to top" links can scroll to it.
export default function Skills() {
    return (
        <section className="view" id="skills" aria-label="Skills and experience">
            <div className="sec-h">
                <h2>Skills &amp; Experience</h2>
                <p>A bit about how I got here and what I work with.</p>
            </div>

            <div style={{ display: 'grid', gap: 24, gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 820 }}>
                <div>
                    {ABOUT.map((p, i) => (<p key={i} style={{ color: 'var(--mut)', margin: '0 0 14px', fontSize: '1rem', lineHeight: 1.7 }}>{p}</p>))}
                </div>

                <div>
                    <h3 style={{ fontFamily: 'var(--f-display)', fontSize: 'var(--t-l)', margin: '12px 0 8px', fontWeight: 600 }}>Skills</h3>
                    <div className="skill-list" style={{ display: 'grid', gap: 10 }}>
                        {SKILLS.map((s) => (
                            <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
                                <div className="mono" style={{ color: 'var(--ink)' }}>{s.label}</div>
                                <div style={{ background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 999, height: 8, overflow: 'hidden' }}>
                                    <div style={{ width: s.value + '%', height: '100%', background: 'var(--acc)', borderRadius: 999, transition: 'width .6s ease' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
                    <div>
                        <div className="mono" style={{ marginBottom: 6 }}>Backend</div>
                        <div className="tags">
                            {STACKS.backend.map((s) => (<span className="tag" key={s.title}>{s.title}</span>))}
                        </div>
                    </div>
                    <div>
                        <div className="mono" style={{ marginBottom: 6 }}>Frontend</div>
                        <div className="tags">
                            {STACKS.frontend.map((s) => (<span className="tag" key={s.title}>{s.title}</span>))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
