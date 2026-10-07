import MARQUEE_ICONS from '../data/marqueeIcons';

export default function TechMarquee() {
    // Duplicate the list so the keyframes translate from 0 -> -50% loops seamlessly.
    const doubled = [...MARQUEE_ICONS, ...MARQUEE_ICONS];
    return (
        <div className="container-x" aria-label="Technologies" role="region">
            <div className="marquee py-3">
                <div className="marquee-track">
                    {doubled.map((icon, i) => (
                        <div
                            key={`${icon.name}-${i}`}
                            className="marquee-chip"
                            title={icon.name}
                            aria-label={icon.name}
                        >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d={icon.path} fill="currentColor" />
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
