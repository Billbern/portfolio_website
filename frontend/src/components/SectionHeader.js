// Section header: indexed mono label above the display title.
// e.g. "01 · SELECTED WORK" (12px uppercase mono) then the h2 title
// at clamp(1.75rem, 4vw, 2.5rem) per the type scale.
export default function SectionHeader({ index, label, title, lead }) {
    const labelText = `${String(index).padStart(2, '0')} · ${label.toUpperCase()}`;
    return (
        <header className="mb-8">
            <div className="mono-label text-muted" aria-hidden="true">{labelText}</div>
            <h2 className="h2-section mt-2">{title}</h2>
            {lead ? <p className="mt-2 text-muted max-w-2xl">{lead}</p> : null}
        </header>
    );
}
