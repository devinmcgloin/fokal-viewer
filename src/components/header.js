import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'

const LoggedOutHeader = (props) => {

    const toggle = () => {
        document.getElementById("menu").classList.toggle("is-active");
        document.getElementById("hamburger").classList.toggle("is-active");
    };

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

            <div id="menu" className="navbar-menu">
                <div className="navbar-end">

                    <div className="navbar-item has-dropdown is-hoverable">
                        <span className="navbar-link">
                            Images
                        </span>
                        <div className="navbar-dropdown ">
                            <Link className="navbar-item " to="/featured" onClick={toggle}>
                                Featured
                            </Link>
                            <Link className="navbar-item " to="/recent" onClick={toggle}>
                                Recent
                            </Link>
                            <Link className="navbar-item " to="/trending" onClick={toggle}>
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

                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <Link className="button" to="/login">
                                    {/*<span className="icon">*/}
                                    {/*</span>*/}
                                    <span>Login</span>
                                </Link>
                            </p>
                            <p className="control">
                                <Link className="button is-primary" to="/join">
                                    {/*<span className="icon">*/}
                                    {/*</span>*/}
                                    <span>Join</span>
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}


const LoggedInHeader = (props) => {

    const toggle = () => {
        document.getElementById("menu").classList.toggle("is-active");
        document.getElementById("hamburger").classList.toggle("is-active");
    };

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

            <div id="menu" className="navbar-menu">
                <div className="navbar-end">

                    <div className="navbar-item has-dropdown is-hoverable">
                        <span className="navbar-link">
                            Images
                        </span>
                        <div className="navbar-dropdown ">
                            <Link className="navbar-item " to="/featured" onClick={toggle}>
                                Featured
                            </Link>
                            <Link className="navbar-item " to="/recent" onClick={toggle}>
                                Recent
                            </Link>
                            <Link className="navbar-item " to="/trending" onClick={toggle}>
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

                    <div className="navbar-item">
                        <div className="field is-grouped">
                            <p className="control">
                                <Link className="button is-primary" to="/upload">
                                    {/*<span className="icon">*/}
                                    {/*</span>*/}
                                    <span>Upload</span>
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
}
const HeaderContainer = (props) => {
    return props.isLoggedIn ? <LoggedInHeader user={props.currentUser}/> : <LoggedOutHeader/>

};


export {LoggedOutHeader, LoggedInHeader, HeaderContainer};
