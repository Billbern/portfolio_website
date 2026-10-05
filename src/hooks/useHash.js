import { useEffect, useState } from 'react';

// Mirrors the original template's `route()` function: parses location.hash and
// distinguishes between a tab hash (#featured, #web, ...) and a post hash
// (#post-<id>). Returns the current hash string so a tab view can sync state.
export default function useHash() {
    const [hash, setHash] = useState(() => (typeof window === 'undefined' ? '' : window.location.hash.slice(1)));

    useEffect(() => {
        const onHashChange = () => setHash(window.location.hash.slice(1));
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    return hash;
}
