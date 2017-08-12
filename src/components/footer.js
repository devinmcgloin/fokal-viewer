import React from 'react'

const Footer = () =>
    <footer className="sans-serif ph3 ph4-ns pv6 bt b--black-10 black-70">
        <a href="mailto:hello@fokal.com" className="sans-serif link b f3 f2-ns dim black-70 lh-solid">hello@fokal.com</a>
        <p className="sans-serif f6 db b ttu lh-solid">© 2016 Fokal Inc.</p>
        <div className="mt5">
            <a href="/language/" title="Language" className="sans-serif f6 dib pr2 mid-gray dim">Language</a>
            <a href="/terms/" title="Terms" className="sans-serif f6 dib ph2 mid-gray dim">Terms of Use</a>
            <a href="/privacy/" title="Privacy" className="sans-serif f6 dib pl2 mid-gray dim">Privacy</a>
        </div>
    </footer>;

export {Footer};