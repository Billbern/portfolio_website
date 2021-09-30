import '../../assets/css/skills.css';

export default function AboutSkills() {

    return (
        <div className="about-skills">
            <div className="w-75 mx-auto">
                <div className="heading">
                    <h3 className="title">Skills & Experience</h3>
                </div>
                <div className="aboutskills-content">
                    <div className="about-content">
                        <p>
                            I have always had passion for technology even as a kid but my development 
                            experience started somewhere in 2016 when I started creating command lines 
                            applications. Fast forward I create web pages with python flask, joined an intensive AI bootcamp
                            in which my team emerged as winners of a local hackathon, facilitated a MERN stack web development 
                            training in my local community.
                            I now work as a self employed freelancer creating responsive websites for local businesses in the 
                            community and help out people who are now learning programming or web development.
                            I am always available to help out in any web development project.
                        </p>
                    </div>
                    <div className="skills-content">
                        <div className="skill-grid">
                            <div className="techskill-grid">
                                <div className="skill-item">
                                    <h6>HTML5</h6>
                                    <div className="skill-level" >
                                        <div className="skill-level-inner" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <h6>CSS3</h6>
                                    <div className="skill-level" >
                                        <div className="skill-level-inner" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <h6>Javascript</h6>
                                    <div className="skill-level" >
                                        <div className="skill-level-inner" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <h6>Python</h6>
                                    <div className="skill-level" >
                                        <div className="skill-level-inner" style={{ width: '90%' }}></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <h6>OS: Linux</h6>
                                    <div className="skill-level" >
                                        <div className="skill-level-inner" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div className="skill-item">
                                    <h6>Databases: PostgreSQL, MongoDB</h6>
                                    <div className="skill-level" >
                                        <div className="skill-level-inner" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}