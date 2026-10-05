// Real content from the previous React portfolio. Screenshots are imported
// below so they pass through CRA's asset pipeline (hashed filenames, cache-bust).
// REPLACE: per-project add `code: "https://github.com/..."` and/or
// `url: "https://..."` to show Code/Details links on the card.
import portfolio from './assets/img/uploads/portfolio.png';
import socialnetwork from './assets/img/uploads/socialnetwork.png';
import videoconverter from './assets/img/uploads/videoconverter.png';
import calculator from './assets/img/uploads/calculator.png';

export const TABS = [
    ['featured', 'Featured'],
    ['web', 'Web'],
];

export const PROJECTS = [
    {
        t: 'Portfolio design concept',
        s: 'A clean responsive portfolio design built with React and TailwindCSS.',
        c: ['featured', 'web'],
        k: ['react', 'tailwindcss', 'redux', 'nodejs', 'mongodb'],
        img: portfolio,
    },
    {
        t: 'Social Network prototype',
        s: 'A fullstack social network prototype with Flask and PostgreSQL.',
        c: ['featured', 'web'],
        k: ['html5', 'css3', 'python', 'flask', 'postgresql'],
        img: socialnetwork,
    },
    {
        t: 'Video converter prototype',
        s: 'A web-based video converter prototype with React and Flask.',
        c: ['web'],
        k: ['react', 'css3', 'redux', 'python', 'flask'],
        img: videoconverter,
    },
    {
        t: 'React Calculator',
        s: 'A small calculator built with React and TailwindCSS.',
        c: ['web'],
        k: ['react', 'tailwindcss', 'redux'],
        img: calculator,
    },
];

// About & Skills content (replaces the template's placeholder Writing section).
export const ABOUT = [
    'I have always had passion for technology even as a kid but my development experience started somewhere in 2016 when I started creating command lines applications. Fast forward I create web pages with python flask, joined an intensive AI bootcamp in which my team emerged as winners of a local hackathon, facilitated a MERN stack web development training in my local community.',
    'I now work as a self employed freelancer creating responsive websites for local businesses in the community and help out people who are now learning programming or web development.',
    'I am always available to help out in any web development project.',
];

export const SKILLS = [
    { label: 'HTML5', value: 70 },
    { label: 'CSS3', value: 80 },
    { label: 'Javascript', value: 75 },
    { label: 'Python', value: 90 },
    { label: 'OS: Linux', value: 80 },
    { label: 'Databases: PostgreSQL, MongoDB', value: 60 },
];

export const STACKS = {
    backend: [
        { title: 'nodejs', file: 'nodejs.svg' },
        { title: 'express', file: 'express.svg' },
        { title: 'python', file: 'python.svg' },
        { title: 'flask', file: 'flask.svg' },
        { title: 'docker', file: 'docker.svg' },
        { title: 'postgreSQL', file: 'postgresql.svg' },
        { title: 'mongoDB', file: 'mongodb.svg' },
    ],
    frontend: [
        { title: 'html5', file: 'html5.svg' },
        { title: 'css3', file: 'css3.svg' },
        { title: 'sass', file: 'sass.svg' },
        { title: 'tailwindcss', file: 'tailwindcss.svg' },
        { title: 'react', file: 'react.svg' },
        { title: 'javascript', file: 'javascript.svg' },
        { title: 'redux', file: 'redux.svg' },
    ],
};
