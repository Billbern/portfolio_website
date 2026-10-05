import { useState } from 'react';
import { SITE } from '../site';

export default function Contact() {
    const [copyText, setCopyText] = useState('Copy email');

    function onCopy() {
        const fallback = () => { setCopyText(SITE.email); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(SITE.email).then(() => setCopyText('Copied'), fallback);
        } else {
            fallback();
        }
    }

    return (
        <section className="view contact" id="contact">
            <h2>Contact</h2>
            <p>I&apos;m open to web development projects. If you have an interesting problem, let&apos;s talk.</p>
            <div className="btns">
                <a className="btn pri" href={`mailto:${SITE.email}`}>Email</a>
                <a className="btn" href={SITE.github} rel="noopener noreferrer" target="_blank">GitHub</a>
                <a className="btn" href={SITE.twitter} rel="noopener noreferrer" target="_blank">Twitter</a>
                <button className="btn" id="copy" type="button" onClick={onCopy}>{copyText}</button>
            </div>
        </section>
    );
}
