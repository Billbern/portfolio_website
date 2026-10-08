import { useEffect } from 'react';

// Add .is-in to any element with .reveal when it enters the viewport.
// `dep` re-runs the scan (pass the route pathname so sections mounted after
// the first route get observed). Honours prefers-reduced-motion: if reduced,
// the CSS keeps .reveal visible at all times (see index.css), so we skip the
// observer entirely.
export default function useReveal(rootRef, dep) {
    useEffect(() => {
        const root = rootRef && rootRef.current ? rootRef.current : document;
        if (!root) return undefined;
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
            return undefined;
        }
        if (!('IntersectionObserver' in window)) {
            root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
            return undefined;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        root.querySelectorAll('.reveal').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [rootRef, dep]);
}
