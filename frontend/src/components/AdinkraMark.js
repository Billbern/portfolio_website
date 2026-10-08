// AdinkraMark — decorative Adinkra symbol (Ghana) as an inline SVG.
// CRA 4 has no Vite `?raw`, so inlining goes through CRA's built-in SVGR
// (`ReactComponent` named import). The wrapper is aria-hidden, pointer-events
// -none and select-none: purely decorative, never interactive. Callers pass
// sizing/placement via className (currently just the footer's inline glyph;
// the page-wide texture is the .cloth-layer data-URI tile in index.css).
import { ReactComponent as Nkyinkyim } from '../assets/adinkra/nkyinkyim.svg';
import { ReactComponent as Sankofa } from '../assets/adinkra/sankofa.svg';
import { ReactComponent as Adinkrahene } from '../assets/adinkra/adinkrahene.svg';
import { ReactComponent as Dwennimmen } from '../assets/adinkra/dwennimmen.svg';

const MARKS = {
    nkyinkyim: Nkyinkyim,
    sankofa: Sankofa,
    adinkrahene: Adinkrahene,
    dwennimmen: Dwennimmen,
};

export default function AdinkraMark({ name, className }) {
    const Mark = MARKS[name];
    if (!Mark) return null;
    return (
        <span
            aria-hidden="true"
            className={`adinkra-mark pointer-events-none select-none${className ? ` ${className}` : ''}`}
        >
            <Mark />
        </span>
    );
}