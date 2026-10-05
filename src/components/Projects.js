import { useEffect, useMemo, useRef } from 'react';
import { TABS, PROJECTS } from '../data';

// React port of the template's tablist + filtered card grid. Port behaviour:
//  - Tabs are derived from TABS ∪ categories present in PROJECTS.
//  - Keyboard arrow/Home/End navigate tabs (matches ARIA tabs pattern).
//  - First card in lists longer than 3 becomes a "lead" card.
//  - Images fade in via the .thumb.wait shimmer (removed on image load).
function visibleTabs() {
    return TABS.filter((t) => t[0] === 'featured' || PROJECTS.some((p) => p.c.includes(t[0])));
}

export default function Projects({ activeTab, onTabChange }) {
    const tabsRef = useRef(null);
    const gridRef = useRef(null);

    const tabs = useMemo(visibleTabs, []);
    const ids = tabs.map((t) => t[0]);
    const labelById = useMemo(() => Object.fromEntries(tabs.map((t) => [t[0], t[1]])), [tabs]);

    const list = useMemo(() => PROJECTS.filter((p) => p.c.includes(activeTab)), [activeTab]);
    const counts = useMemo(() => {
        const c = {};
        ids.forEach((id) => { c[id] = 0; });
        PROJECTS.forEach((p) => p.c.forEach((id) => { if (id in c) c[id] += 1; }));
        return c;
    }, [ids]);

    function select(id) {
        onTabChange(id);
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '#' + id);
        }
    }

    function onTabKey(e, id) {
        const i = ids.indexOf(id);
        let next = null;
        if (e.key === 'ArrowRight') next = i + 1;
        else if (e.key === 'ArrowLeft') next = i - 1;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = ids.length - 1;
        if (next === null) return;
        e.preventDefault();
        next = (next + ids.length) % ids.length;
        const id2 = ids[next];
        select(id2);
        // focus the newly selected tab
        if (tabsRef.current) {
            const btn = tabsRef.current.querySelector(`[data-id="${id2}"]`);
            if (btn) btn.focus();
        }
    }

    // After render, wire up image "wait" -> loaded for the lazy fade-in.
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;
        const imgs = grid.querySelectorAll('.thumb.wait img');
        imgs.forEach((im) => {
            const onLoaded = () => { if (im.parentNode) im.parentNode.classList.remove('wait'); };
            if (im.complete) onLoaded();
            else im.addEventListener('load', onLoaded, { once: true });
        });
    }, [activeTab]);

    return (
        <section className="view" aria-label="Projects">
            <div className="sec-h">
                <h2>Selected work</h2>
                <p>Web applications and design experiments.</p>
            </div>
            <div role="tablist" aria-label="Project categories" id="tabs" ref={tabsRef}>
                {tabs.map((t) => (
                    <button
                        type="button"
                        role="tab"
                        id={`tab-${t[0]}`}
                        key={t[0]}
                        data-id={t[0]}
                        aria-selected={activeTab === t[0]}
                        tabIndex={activeTab === t[0] ? 0 : -1}
                        onClick={() => select(t[0])}
                        onKeyDown={(e) => onTabKey(e, t[0])}
                    >
                        {t[1]}<span className="n">{counts[t[0]]}</span>
                    </button>
                ))}
            </div>
            <div
                className="grid"
                id="grid"
                role="tabpanel"
                tabIndex="0"
                ref={gridRef}
                aria-labelledby={`tab-${activeTab}`}
            >
                {list.length === 0 ? (
                    <p className="mono" style={{ gridColumn: '1 / -1' }}>No projects in this category.</p>
                ) : list.map((p, i) => {
                    const cat = (p.c.filter((c) => c !== 'featured')[0]) || 'featured';
                    const lead = list.length > 3 && i === 0;
                    return (
                        <article className={'card' + (lead ? ' lead' : '')} key={p.t} style={{ '--i': i }}>
                            <div className={'thumb' + (p.img ? ' wait' : '')}>
                                {p.img ? (
                                    <img src={p.img} alt={p.t + ' screenshot'} loading="lazy" />
                                ) : (
                                    <div className="ph" aria-hidden="true">
                                        <span>{(p.t.charAt(0) || '')}</span>
                                        <small>Screenshot coming</small>
                                    </div>
                                )}
                                <span className="badge">{labelById[cat]}</span>
                        </div>
                        <div className="b">
                            <h3>{p.t}</h3>
                            <p>{p.s}</p>
                            <div className="tags">
                                {p.k.map((k) => (<span className="tag" key={k}>{k}</span>))}
                            </div>
                            {(p.code || p.url) ? (
                                <div className="links">
                                    {p.code ? <a href={p.code} rel="noopener noreferrer" target="_blank">Code</a> : null}
                                    {p.url ? <a href={p.url} rel="noopener noreferrer" target="_blank">Details</a> : null}
                                </div>
                            ) : null}
                        </div>
                    </article>
                    );
                })}
            </div>
        </section>
    );
}
