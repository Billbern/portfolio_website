import { Component, createRef } from 'react';
import '../../assets/css/projects.css';


let timeCaro = null;

export default class Projects extends Component {

    constructor() {
        super();
        this.contentRef = createRef();
        this.moveCaro = this.moveCaro.bind(this);
        this.clearCaro = this.clearCaro.bind(this);
        this.state = {
            carouselItem: 0
        }
    }

    componentDidMount() {
        this.getCaro();

        timeCaro = setInterval(() => {
            this.moveCaro()
        }, 10000);
    }

    getCaro() {
        this.setState({
            ...this.state,
            carouselItem: (this.contentRef.current.clientWidth - (2 * 16)) / 3
        })
    }

    moveCaro(direction) {
        let carouSel = document.querySelector('#carouSel');
        let transform = carouSel.style.transform ? carouSel.style.transform.split('(')[1].split('p')[0] : 0;
        const firstChild = carouSel.firstElementChild;
        const lastChild = carouSel.lastElementChild;

        console.log(transform);

        if (direction) {
            carouSel.removeChild(lastChild);
            carouSel.insertBefore(lastChild, firstChild);
        } else {
            carouSel.removeChild(firstChild);
            carouSel.appendChild(firstChild);
        }

    }

    clearCaro(){
        clearInterval(timeCaro);
    }

    render() {

        return (
            <section className="project">
                <div ref={this.contentRef} className="container">
                    <div className="heading">
                        <h3 className="title">Projects</h3>
                        <h6 className="more">see all</h6>
                    </div>
                    <div className="body">
                        <div className="contents" onMouseOver={this.clearCaro} onMouseOut={()=>{timeCaro = setInterval(() => { this.moveCaro() }, 10000 )}}>
                            <div className="carousel-control">
                                <span onClick={() => this.moveCaro('left')} className="prev">
                                    <img src={require('../../assets/img/icons/arrow-left.svg').default} alt="previous" />
                                </span>
                                <span onClick={() => this.moveCaro()} className="next">
                                    <img src={require('../../assets/img/icons/arrow-right.svg').default} alt="next" />
                                </span>
                            </div>
                            <div className="carousel" id="carouSel">
                                <div className="project-item">
                                    <div className="project-img" style={{ width: `${this.state.carouselItem}px` }}>
                                        <img src={require('../../assets/img/uploads/portfolio.png').default} alt="portfolio concept" />
                                    </div>
                                    <h6>Portfolio design concept</h6>
                                    <div className="project-stack">
                                        {
                                            ['react', 'tailwindcss', 'redux', 'nodejs', 'mongodb'].map((item, key) => {
                                                return <div className="stack-icons" title={item} key={key}>
                                                    <img src={require(`../../assets/img/icons/${item}.svg`).default} alt={item} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="project-item">
                                    <div className="project-img" style={{ width: `${this.state.carouselItem}px` }}>
                                        <img src={require('../../assets/img/uploads/socialnetwork.png').default} alt="social network" />
                                    </div>
                                    <h6>Social Network prototype</h6>
                                    <div className="project-stack">
                                        {
                                            ['html5', 'css3', 'python', 'flask', 'postgresql'].map((item, key) => {
                                                return <div className="stack-icons" title={item} key={key}>
                                                    <img src={require(`../../assets/img/icons/${item}.svg`).default} alt={item} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="project-item">
                                    <div className="project-img" style={{ width: `${this.state.carouselItem}px` }}>
                                        <img src={require('../../assets/img/uploads/videoconverter.png').default} alt="media converter" />
                                    </div>
                                    <h6>Video converter prototype</h6>
                                    <div className="project-stack">
                                        {
                                            ['react', 'css3', 'redux', 'python', 'flask'].map((item, key) => {
                                                return <div className="stack-icons" title={item} key={key}>
                                                    <img src={require(`../../assets/img/icons/${item}.svg`).default} alt={item} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="project-item">
                                    <div className="project-img" style={{ width: `${this.state.carouselItem}px` }}>
                                        <img src={require('../../assets/img/uploads/calculator.png').default} alt="calculator" />
                                    </div>
                                    <h6>React Calculator</h6>
                                    <div className="project-stack">
                                        {
                                            ['react', 'tailwindcss', 'redux'].map((item, key) => {
                                                return <div className="stack-icons" title={item} key={key}>
                                                    <img src={require(`../../assets/img/icons/${item}.svg`).default} alt={item} />
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}