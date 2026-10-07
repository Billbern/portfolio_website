// Selected Work copy deck — verbatim per spec. Brackets = TODOs (never invented).
// Screenshots are reused from the previous site; if any contain stale branding
// they should be recaptured. See TODO.md.
import portfolio from '../assets/img/uploads/portfolio.png';
import socialnetwork from '../assets/img/uploads/socialnetwork.png';
import videoconverter from '../assets/img/uploads/videoconverter.png';
import calculator from '../assets/img/uploads/calculator.png';

export const PROJECTS = [
    {
        slug: 'portfolio-design-concept',
        year: '[2025]', // TODO: confirm exact year
        role: 'FRONTEND',
        team: 'SOLO',
        title: 'Portfolio design concept',
        summary:
            'Designed and built this responsive portfolio: React and Tailwind CSS front end, Redux state, Node.js tooling, containerized deploy.',
        tags: ['React', 'Tailwind CSS', 'Redux', 'Node.js', 'MongoDB'],
        bgHue: 1,
        img: portfolio,
        code: 'https://github.com/billbern', // TODO: link to actual repo when published
        live: null,
    },
    {
        slug: 'social-network-prototype',
        year: '[2024]', // TODO: confirm exact year
        role: 'FULLSTACK',
        team: 'SOLO',
        title: 'Social Network prototype',
        summary:
            'Full social prototype — auth, feeds, posts, comments — on a normalized PostgreSQL schema served by a Flask REST API.',
        tags: ['Python', 'Flask', 'PostgreSQL', 'HTML5', 'CSS3'],
        bgHue: 2,
        img: socialnetwork,
        code: 'https://github.com/billbern', // TODO: link to actual repo when published
        live: null,
        caseStudy: 'social-network-prototype',
    },
    {
        slug: 'video-converter-prototype',
        year: '[YEAR]', // TODO: year
        role: 'FULLSTACK',
        team: 'SOLO',
        title: 'Video converter prototype',
        summary:
            'Upload, convert, download: a browser video converter with a React UI and Flask processing backend.',
        tags: ['React', 'Python', 'Flask', 'Redux', 'CSS3'],
        bgHue: 3,
        img: videoconverter,
        code: 'https://github.com/billbern',
        live: null,
    },
    {
        slug: 'react-calculator',
        year: '[YEAR]', // TODO: year
        role: 'FRONTEND',
        team: 'SOLO',
        title: 'React Calculator',
        summary:
            'Keyboard-first calculator built on pure reducer logic with unit tests — a study in clean React state.',
        tags: ['React', 'Tailwind CSS', 'Redux'],
        bgHue: 4,
        img: calculator,
        code: 'https://github.com/billbern',
        live: null,
    },
];
