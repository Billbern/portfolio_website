import { Component, createRef } from 'react';
import '../../assets/css/projects.css';

let timeCaro = null;

export default class Projects extends Component {

    constructor() {
        super();
        this.contentRef = createRef();
        this.startMovement = this.startMovement.bind(this);
        this.state = {
            projects: [
                { img: "../../assets/img/uploads/portfolio.png", title: 'Portfolio design concept', stack: ['react', 'tailwindcss', 'redux', 'nodejs', 'mongodb'] },
                { img: "../../assets/img/uploads/socialnetwork.png", title: 'Social Network prototype', stack: ['html5', 'css3', 'python', 'flask', 'postgresql'] },
                { img: "../../assets/img/uploads/videoconverter.png", title: 'Video converter prototype', stack: ['react', 'css3', 'redux', 'python', 'flask'] },
                { img: "../../assets/img/uploads/calculator.png", title: 'React Calculator', stack: ['react', 'tailwindcss', 'redux'] }
            ],
            carouselItem: 0
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            carouselItem: (this.contentRef.current.clientWidth - (2 * 16)) / 3
        });
        timeCaro = setInterval(() => {
            this.startMovement(false);
        }, 10000);
    }

    startMovement(left) {
        let carouSel = document.querySelector('#carouSel');
        const firstItem = carouSel.firstElementChild;
        const lastItem = carouSel.lastElementChild;

        if (!left) {
            carouSel.style.transform = `translate(-${ this.state.carouselItem + 16 }px)`;
        } else {
            carouSel.style.transform = `translate(${ this.state.carouselItem + 16 }px)`;
        }

        carouSel.addEventListener('transitionend', () => {
            if (!left) {
                carouSel.appendChild(firstItem);
            }
            if (left) {
                carouSel.prepend(lastItem);
            }
            carouSel.style.transition = 'none';
            carouSel.style.transform = 'translate(0)';
            setTimeout(function () {
                carouSel.style.transition = 'all 1.25s ease-in-out';
            })
        })
    }

    stopMovement() {
        clearInterval(timeCaro);
    }

    render() {

        return (
            <section className="project">
                <div ref={this.contentRef} className="w-75 mx-auto">
                    <div className="heading">
                        <h3 className="title">Projects</h3>
                        <h6 className="more">see all</h6>
                    </div>
                    <div className="body">
                        <div className="contents" onMouseOver={this.stopMovement} onMouseOut={() => { timeCaro = setInterval(() => { this.startMovement(false) }, 10000) }}>
                            <div className="carousel-control">
                                <span className="prev" onClick={() => this.startMovement(true)}>
                                    <img src={require('../../assets/img/icons/arrow-left.svg').default} alt="previous" />
                                </span>
                                <span className="next" onClick={() => this.startMovement(false)}>
                                    <img src={require('../../assets/img/icons/arrow-right.svg').default} alt="next" />
                                </span>
                            </div>
                            <div className="carousel" id="carouSel">
                                {
                                    this.state.projects.map((item, key) => {
                                        return (
                                            <div key={key} className="project-item">
                                                <div className="project-img" style={{ width: `${this.state.carouselItem}px` }}>
                                                    <img src={require(`../../assets/img/uploads/${item.img.split('/')[5]}`).default} alt={item.img} />
                                                </div>
                                                <h6>{item.title}</h6>
                                                <div className="project-stack">
                                                    {
                                                        item.stack.map((item, key) => {

                                                            return (
                                                                <div className="stack-icons" title={item} key={key}>
                                                                    <img src={require(`../../assets/img/icons/${item}.svg`).default} alt={item} />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}