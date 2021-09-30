import Footer from "./footer/footer";
import HeroSection from "./hero/hero";
import Projects from "./projects/projects";
import SkillsMap from "./skillsmap";


function App() {
    return (
        <div className="App">
            <HeroSection />
            <Projects />
            <SkillsMap />
            <Footer/>
        </div>
    );
}

export default App;
