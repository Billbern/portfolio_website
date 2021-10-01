import { Component, createRef } from 'react';
import '../../assets/css/hero.css';


export default class HeroSection extends Component {

    constructor() {
        super();
        this.rectRef = createRef();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            animation: [
                "danceAround25 6s linear 0.5ms infinite", "danceAround25 6s linear 0.5ms reverse infinite",
                "danceAround50 6s linear 0.5ms infinite", "danceAround50 6s linear 0.5ms reverse infinite",
                "danceAround75 6s linear 0.5ms reverse infinite", "danceAround75 6s linear 0.5ms reverse infinite"
            ],
            coord: null,
            menu: false,
            stack: {
                backend: [{ title: 'nodejs', file: 'nodejs.svg' }, { title: 'express', file: 'express.svg' }, { title: 'python', file: 'python.svg' }, { title: 'flask', file: 'flask.svg' }, { title: 'docker', file: 'docker.svg' }, { title: 'postgreSQL', file: 'postgresql.svg' }, { title: 'mongoDB', file: 'mongodb.svg' }],
                frontend: [{ title: 'html5', file: 'html5.svg' }, { title: 'css3', file: 'css3.svg' }, { title: 'sass', file: 'sass.svg' }, { title: 'tailwindcss', file: 'tailwindcss.svg' }, { title: 'react', file: 'react.svg' }, { title: 'javascript', file: 'javascript.svg' }, { title: 'redux', file: 'redux.svg' }]
            }
        }
    }

    componentDidMount() {
        const newCoord = this.genCoord();

        this.setState({
            ...this.state,
            coord: newCoord
        })
    }

    genCoord() {
        let chosen = {};
        let newCoord = {};
        const coord = [
            [6.75, 19.25], [14.5, 60.5], [40.25, 41.5], [18, 46.75],
            [47, 0], [54.5, 78], [76.5, 19], [95, 67.75],
            [0, 40.5], [18, 0], [22, 55.25], [46.75, 21.5],
            [50, 62.5], [75, 11.25], [71.25, 71.25], [49.5, 23.5]
        ]
        while (Object.keys(newCoord).length < 15) {

            let coordRandom = Math.floor(Math.random() * coord.length);

            if (!chosen[String(coord[coordRandom][0])]) {
                chosen[String(coord[coordRandom][0])] = true;
                newCoord[Object.keys(newCoord).length] = coord[coordRandom]
            }
        }
        return Object.values(newCoord);
    }

    toggleMenu() {
        this.setState({
            ...this.state,
            menu: !this.state.menu
        })
    }

    render() {

        return (
            !this.state.coord ?
                ''
                :
                <div className="hero">
                    <div className="hero-inner w-75 mx-auto">
                        <header className="header">
                            <div className="logo">
                                <a href="/">
                                    <svg viewBox="0 0 576 576" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M469.261 306.004a189.552 188.053 0 00-178.927 187.757 189.552 188.053 0 009.884 59.932 189.552 188.053 0 00178.927-187.757 189.552 188.053 0 00-9.884-59.932z"
                                            fillOpacity=".547" fill="#3fa9f5" paintOrder="stroke fill markers" />
                                        <g paintOrder="stroke fill markers">
                                            <path d="M96.75 21.636s.112 94.971.112 132.471h20.166l-9.041 119.338c36.209-.307 75.352-6.176 107.778 0v-60.002h72.218c.484 35.938 1.274 74.608 1.274 74.608 10.413-.054 15.66-.074 21.537-.098 65.773-8.13 116.69-64.205 116.69-132.178-.001-73.56-59.634-133.193-133.194-133.193h-.569c-29.17.124-18.843.07-77.957-.295v-.117h-20.466c-12.216-.071-20.544-.126-37.948-.217zm214.044 266.317c-.702.087-1.405.166-2.11.242 17.276-.21 26.82-.342 2.11-.242zm-2.11.242c-25.243.308-61.826.75-14.394.775 4.864 0 9.665-.267 14.394-.775zm-92.92-134.088h72.663v18.016l-.815-.254.002.254h-71.85z"
                                                fill="#3fa9f5" />
                                            <path d="M399.386 517.711c48.451-51.173 22.337-123.09-32.846-179.44a191.252 191.252 0 00-78.291 137.813c5.49 18.31 7.175 27.86 38.459 48.756 17.188 10.247 57.15-1.179 64.033-1.185a191.252 191.252 0 008.645-5.944z"
                                                fill="#f7e4e4" />
                                            <path d="M290.211 184.551c-22.882 20.577-76.446.957-76.446 26.933 0 61.961 1.34 61.885 2 61.961a728.11 728.11 0 00.897.1 75.255 75.255 0 01.643.068l.267.03.213.023.285.033.13.016.127.015.135.016.107.013.415.052.129.016.136.018a103.999 103.999 0 014.231.634l.49.085c35.194 4.838 70.794 19.44 98.398 32.804a250.895 250.895 0 015.88 2.981 231.339 231.339 0 014.597 2.478 213.843 213.843 0 014.595 2.623 196.97 196.97 0 015.347 3.262 181.172 181.172 0 013.356 2.177 169.34 169.34 0 014.867 3.36 154.2 154.2 0 016.067 4.582 132.096 132.096 0 018.823 7.672c56.918 57.472 83.68 131.54 31.473 183.209 19.356-12.12 45.167-36.01 66.498-79.243 12.972-26.288 15.38-59.87 15.381-77.347 0-105.626-83.415-178.57-189.04-178.57-.41 18.218 0 18.24 0 0zM103.18 313.94a191.252 191.252 0 00-6.432 49.182c0 103.608 82.502 188.375 186.072 191.181 24.686.696 46.047-4.867 46.047-4.867 7.853-1.738 16.916-4.546 25.45-7.631 0 0 2.38-.895 6.056-2.404a312.017 312.017 0 003.812-1.594 289.794 289.794 0 006.5-2.863c1.02-.464 2.057-.945 3.105-1.44 1.125-.53 2.262-1.078 3.399-1.64a165.942 165.942 0 006.867-3.576c2.976-1.647 5.782-3.349 8.19-5.047-5.057.834-9.425 1.656-14.122 2.559l-.78.15c-2.7.48-5.277.965-7.751 1.413-18.719 2.405-43.5-4.978-54.453-12.325-.3-.21-.6-.422-.896-.635-.57-.406-1.133-.824-1.656-1.21-.573-.429-1.137-.86-1.692-1.292-21.301-19.32-25.99-51.448-33.352-75.927-.639-2.013-1.3-4.04-1.981-6.076a378.887 378.887 0 00-3.276-9.381c-.951-2.61-1.938-5.227-2.964-7.841a313.812 313.812 0 00-2.507-6.2 271.732 271.732 0 00-6.91-15.27 230.119 230.119 0 00-4.011-7.789 203.997 203.997 0 00-4.2-7.413 179.501 179.501 0 00-4.774-7.594 156.573 156.573 0 00-5.165-7.316c-2.846-3.79-5.84-7.392-8.987-10.761a113.095 113.095 0 00-2.941-3.033 103.343 103.343 0 00-5.402-5.002 92.77 92.77 0 00-5.692-4.528c-4.213-3.086-8.708-5.754-13.436-8.062a102.694 102.694 0 00-5.612-2.532 117.185 117.185 0 00-8.907-3.279c-1.575-.51-3.166-.992-4.774-1.447a151.501 151.501 0 00-7.494-1.913c-3.058-.7-6.16-1.317-9.3-1.864a212.89 212.89 0 00-5.75-.918c-1.982-.29-3.976-.555-5.98-.797-2.783-.336-5.584-.63-8.398-.886-15.281-1.396-30.913-1.726-45.903-2.132z"
                                                fill="#3fa9f5" />
                                        </g>
                                    </svg>
                                </a>
                            </div>
                            <div className="hamburger">
                                <div className={`menu ${this.state.menu ? 'active' : ''} `} onClick={this.toggleMenu}>
                                    <span className="top"></span>
                                    <span className="mid"></span>
                                    <span className="bot"></span>
                                </div>
                            </div>
                        </header>

                        <div className="hero-intro">
                            <div className="icons backend-icons">
                                <div className="icon-container">
                                    {
                                        this.state.stack.backend.map((item, key) => {
                                            return (
                                                <div className="tech-icons" title={item.title} key={key} style={{ top: `${this.state.coord[key + 1][1]}%`, left: `${this.state.coord[key + 1][0]}%`, animation: `${(key + 1) % 2 === 0 ? (key + 1) < 5 ? this.state.animation[3] : this.state.animation[2] : (key + 1) < 5 ? this.state.animation[1] : this.state.animation[0]}` }}>
                                                    <img src={require(`../../assets/img/icons/${item.file}`).default} alt={item.title} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="intro">
                                <div className="heading">
                                    <span>
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.148 14.862C6.784 13.659 4.9 12.026 2.534 9.916a1.049 1.049 0 01-.059-1.466 1.074 1.074 0 011.479-.11c2.157 1.455 3.86 2.66 5.133 3.567.455.326.757.273.9.1s.08-.413-.307-.888C8.6 9.783 7.12 8.013 5.3 5.767a1.028 1.028 0 01.13-1.447 1.128 1.128 0 011.516.062q3.415 3.207 5.354 5.082c.443.43.667.492.861.418s.313-.3.1-.682C12.5 7.846 11.458 6.031 10.2 3.713a1.07 1.07 0 01.184-1.469 1.1 1.1 0 011.494.108l5.8 7.669c.193.255.3.337.471.3s.187-.148.226-.455c.127-1 .382-3.238.382-3.238a1.176 1.176 0 011.217-.953A1.082 1.082 0 0121 6.753v9.354a6.072 6.072 0 01-3.228 5.09 5.944 5.944 0 01-6.344-.245l-8.98-5.468a1.074 1.074 0 01-.275-1.458A1.059 1.059 0 013.61 13.7c1.863.861 3.313 1.534 4.456 2.075.323.153.563.058.64-.126s-.077-.363-.558-.787z" fill="#ffa458" />
                                            <animateTransform attributeName="transform" type="rotate" id="wavy_1" begin="0s; wavy_2.end" from="0 16.921 18.442" to="30 16.921 18.442" dur="2s" />
                                            <animateTransform attributeName="transform" type="rotate" id="wavy_2" begin="wavy_1.end" from="30 16.921 18.442" to="0 16.921 18.442" dur="4s" />
                                        </svg>
                                    </span>
                                    <h1> Hi, </h1>
                                </div>
                                <div className="content">
                                    <p>
                                        I am Bernard Abaidoo.
                                        I am a fullstack web developer and a machine learning ethusiast in short,
                                        I design, build and maintain websites and web applications
                                    </p>
                                    <div className="content-buttons">
                                        <span className="btn business">
                                            <a href="mailto:bernard.k.abaidoo@gmail.com">
                                                email
                                            </a>
                                        </span>
                                        <span className="btn social">
                                            connect
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="icons frontend-icons">
                                <div className="icon-container">
                                    {
                                        this.state.stack.frontend.map((item, key) => {
                                            return (
                                                <div className="tech-icons" title={item.title} key={key} style={{ top: `${this.state.coord[key + 1][0]}%`, left: `${this.state.coord[key + 1][1]}%`, animation: `${(key + 1) % 2 === 0 ? (key + 1) < 5 ? this.state.animation[4] : this.state.animation[3] : (key + 1) < 5 ? this.state.animation[2] : this.state.animation[1]}` }}>
                                                    <img src={require(`../../assets/img/icons/${item.file}`).default} alt={item.title} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`menuBox ${this.state.menu ? 'active' : ''} `}>
                        <div>
                            <ul>
                                <li>Blog</li>
                                <li>Login</li>
                                <li>Projects</li>

                            </ul>
                        </div>
                    </div>
                </div>
        );
    }

}