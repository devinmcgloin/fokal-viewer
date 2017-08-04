import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'

function Header(props) {

    const toggle = () => {
        document.getElementById("menu").classList.toggle("is-active");
        document.getElementById("hamburger").classList.toggle("is-active");
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img src={logo} width={30} height={30}
                         alt="Fokal: A photography site focused on getting your best images seen."/>
                </Link>

                <div id="hamburger" className="navbar-burger burger" data-target="menu" onClick={toggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="menu" className="navbar-menu" >
                <div className="navbar-end">

                    <div className="navbar-item has-dropdown is-hoverable">
                        <span className="navbar-link">
                            Images
                        </span>
                        <div className="navbar-dropdown ">
                            <Link className="navbar-item " to="/i/recent" onClick={toggle}>
                                Recent
                            </Link>
                            <Link className="navbar-item " to="/i/trending" onClick={toggle}>
                                Trending
                            </Link>
                        </div>
                    </div>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <span className="navbar-link">
                            Search
                        </span>
                        <div className="navbar-dropdown ">
                            <Link className="navbar-item " to="/search/text" onClick={toggle}>
                                Text
                            </Link>
                            <Link className="navbar-item " to="/search/geo" onClick={toggle}>
                                Geo
                            </Link>
                            <Link className="navbar-item " to="/search/color" onClick={toggle}>
                                Color
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export {Header};
