import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';

const Header = () => (
    <nav className="sans-serif bg-white">
        <div className="pa2 pa3-ns bb b--black-10 black-70 flex items-center justify-between">
            <Link className="link dib mr3 tc" to="/" title="Home">
                <img src={logo} style={{ width: '3rem', height: '3rem' }} />
            </Link>
            <HeaderSearchBox />
        </div>
        <HeaderMenuItems />
    </nav>
);

class HeaderSearchBox extends Component {
    state = {
        q: '',
        submitted: false,
        submittedQuery: ''
    };
    onSubmit = e => {
        e.preventDefault();
        this.setState(prev => {
            return { submitted: true, submittedQuery: prev.q, q: '' };
        });
    };
    handleTextChange = e =>
        this.setState({
            q: e.target.value
        });
    render = () => {
        const redirect = this.state.submitted ? (
            <Redirect
                push
                to={{
                    pathname: '/search',
                    search: '?q=' + encodeURIComponent(this.state.submittedQuery)
                }}
            />
        ) : null;
        return (
            <React.Fragment>
                {redirect}
                <form onSubmit={this.onSubmit} className="db" style={{ flexGrow: 2 }}>
                    <input
                        type="text"
                        id="query"
                        name="query"
                        onChange={this.handleTextChange}
                        value={this.state.q}
                        className="pa2 mr3 dib h2 bn input-reset br2 bg-near-white w-100"
                    />
                </form>
            </React.Fragment>
        );
    };
}

const HeaderMenuItems = () => {
    return (
        <header className="ph3 ph5-ns pt3 bb b--black-10">
            <div className="mw9 center">
                <a
                    className="f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc"
                    href="/explore"
                >
                    Explore
                </a>

                <a
                    className="f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc"
                    href="/featured"
                >
                    Featured
                </a>

                <a className="f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc" href="/upload">
                    Submit
                </a>

                <a className="f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc" href="/login">
                    Login
                </a>

                <a className="f6 fw6 b dib mr3 mb3 pb1 link hover-blue black-70 ttc" href="/join">
                    <button className="pointer no-underline f6 tc db bn w3 h2 bg-animate bg-green hover-bg-dark-green white br2 ">
                        Join
                    </button>
                </a>
            </div>
        </header>
    );
};

export { Header };
