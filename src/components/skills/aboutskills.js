import '../../assets/css/skills.css';

export default function AboutSkills() {

    return (
        <section className="about-skills">
            <div className="container">
                <div className="heading">
                    <h3 className="title">Skills & Experience</h3>
                </div>
                <div className="aboutskills-content">
                    <div className="about-content">
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ratione
                            doloribus obcaecati dolor optio corrupti non, dignissimos quidem unde
                            ipsum sint impedit nisi suscipit, nulla eveniet autem laboriosam
                            aperiam. Quibusdam?
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ratione
                            doloribus obcaecati dolor optio corrupti non, dignissimos quidem unde
                            ipsum sint impedit nisi suscipit, nulla eveniet autem laboriosam
                            aperiam. Quibusdam?
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
        </section>
    )
}