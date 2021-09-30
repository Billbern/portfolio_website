import { Component } from "react";
import ContactMap from "./contact/contactmap";
import AboutSkills from "./skills/aboutskills";
import '../assets/css/skillsmap.css';

export default class SkillsMap extends Component {
    render() {
        return (
            <section className="skills-map">
                <AboutSkills />
                <div className="skillsmap-contact position-relative">
                    <ContactMap />
                </div>
            </section>
        );
    }
}