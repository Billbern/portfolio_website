import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from '../pages/Home';
import CaseStudy from '../pages/CaseStudy';
import useTheme from '../hooks/useTheme';
import useReveal from '../hooks/useReveal';

function Shell() {
    const [theme, toggleTheme] = useTheme();
    const location = useLocation();
    const revealRootRef = useRef(null);

    // Re-scan for .reveal elements on every route change: sections mounted
    // after the first route (e.g. Home opened from a case study) must be
    // observed too, or they would stay at opacity 0.
    useReveal(revealRootRef, location.pathname);

    // Route-change scroll behavior: jump to the hash target when present
    // (e.g. /#skills from the case-study page), otherwise to the top.
    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash);
            if (el) {
                el.scrollIntoView({ behavior: 'auto' });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, [location.pathname, location.hash]);

    return (
        <div className="min-h-screen flex flex-col" ref={revealRootRef}>
            <a className="skip-link" href="#main">Skip to content</a>
            <Header theme={theme} onToggleTheme={toggleTheme} />
            <main id="main" className="flex-1">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/work/:slug" component={CaseStudy} />
                    <Route component={Home} />
                </Switch>
            </main>
            <Footer theme={theme} onToggleTheme={toggleTheme} />
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Shell />
        </BrowserRouter>
    );
}
