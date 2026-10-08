import { useEffect, useState } from 'react';

// Live local-time string in a given IANA timezone. Updates once per minute.
export default function useLocalTime(timezone) {
    const [now, setNow] = useState(() => formatNow(timezone));
    useEffect(() => {
        const id = setInterval(() => setNow(formatNow(timezone)), 30000);
        return () => clearInterval(id);
    }, [timezone]);
    return now;
}

function formatNow(timezone) {
    try {
        return new Intl.DateTimeFormat('en-GB', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date());
    } catch (_) {
        return '—';
    }
}
