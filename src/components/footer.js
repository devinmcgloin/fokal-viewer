import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="sans-serif pa3 pa4-ns pv6 bt b--black-10 black-70">
        <a href="mailto:hello@fok.al" className="sans-serif link b f3 f2-ns dim black-70 lh-solid">
            hello@fok.al
        </a>
        <p className="sans-serif f6 db b ttu lh-solid">© 2016 Fokal Inc.</p>
        <div className="mt5">
            <Link to="/language" title="Language" className="sans-serif f6 dib pr2 mid-gray dim">
                Language
            </Link>
            <Link to="/terms" title="Terms" className="sans-serif f6 dib ph2 mid-gray dim">
                Terms of Use
            </Link>
            <Link to="/privacy" title="Privacy" className="sans-serif f6 dib pl2 mid-gray dim">
                Privacy
            </Link>
        </div>
    </footer>
);

export { Footer };
