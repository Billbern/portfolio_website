import TechMarquee from '../components/TechMarquee';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Experience from '../components/Experience';
import Highlights from '../components/Highlights';
import Skills from '../components/Skills';
import Contact from '../components/Contact';

export default function Home() {
    return (
        <>
            <TechMarquee />
            <Hero />
            <Work />
            <Experience />
            <Highlights />
            <Skills />
            <Contact />
        </>
    );
}
