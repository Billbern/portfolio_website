import { useEffect, useState } from 'react';
import LogoBowl from './LogoBowl';
import Profile from './Profile';
import Projects from './Projects';
import SkillsSection from './Skills';
import Contact from './Contact';
import Footer from './Footer';
import useHash from '../hooks/useHash';
import useTheme from '../hooks/useTheme';
import { TABS, PROJECTS } from '../data';

const DEFAULT_TAB = 'featured';
const validTabIds = (() => {
    const set = new Set();
    TABS.forEach((t) => set.add(t[0]));
    PROJECTS.forEach((p) => p.c.forEach((id) => set.add(id)));
    return Array.from(set);
})();

function App() {
    const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
    const [theme, toggleTheme] = useTheme();
    const hash = useHash();

    // Sync initial / hash-driven tab selection (only when hash is a tab id,
    // not when navigating to #contact / #skills / #banner).
    useEffect(() => {
        if (!hash) return;
        if (validTabIds.includes(hash)) setActiveTab(hash);
    }, [hash]);

    // Keep <title> in sync with the selected tab.
    useEffect(() => {
        document.title = `${activeTab === 'featured' ? 'Selected work' : activeTab} — Bernard Abaidoo`;
        return () => { document.title = 'Bernard Abaidoo — Fullstack Web · Machine Learning'; };
    }, [activeTab]);

    return (
        <div className="App" data-theme={theme}>
            <LogoBowl activeTab={activeTab} />
            <Profile />
            <main className="wrap">
                <Projects activeTab={activeTab} onTabChange={setActiveTab} />
                <SkillsSection />
                <Contact />
            </main>
            <Footer onToggleTheme={toggleTheme} />
        </div>
    );
}

export default App;
