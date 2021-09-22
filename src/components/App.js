import ContactMap from "./contact/contactmap";
import Footer from "./footer/footer";
import HeroSection from "./hero/hero";
import Projects from "./projects/projects";
import AboutSkills from "./skills/aboutskills";


function App() {
    return (
        <div className="App">
            <HeroSection />
            <Projects />
            <AboutSkills />
            <ContactMap/>
            <Footer/>
        </div>
    );
}

export default App;
