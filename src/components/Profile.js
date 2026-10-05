import { SITE } from '../site';

export default function Profile() {
    return (
        <header>
            <div className="wrap">
                <div className="profile">
                    <div className="emblem" role="img" aria-label={`${SITE.name} monogram`}>{SITE.monogram}</div>
                    <div>
                        <h1>{SITE.name}</h1>
                        <div className="mono">{SITE.tagline}</div>
                        <p>{SITE.intro}</p>
                        <div className="status"><span className="live"></span>Open to projects · {SITE.location}</div>
                    </div>
                    <div className="btns">
                        <a className="btn pri" href="#contact">Contact</a>
                        <a className="btn" href={SITE.github} rel="noopener noreferrer" target="_blank">GitHub</a>
                        <a className="btn" href="#skills">Skills</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
