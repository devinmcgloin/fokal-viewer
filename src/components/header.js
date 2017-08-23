import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'
import PropTypes from 'prop-types'

const LoggedOutHeader = (props) => {


    return (
        <nav className="pa3 pa4-ns bb b--black-10 black-70">
            <Link className="sans-serif link dim black b f6 f5-ns dib mr3" to="/" title="Home">Fokal</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search" title="Search">
                Search</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/explore" title="Explore">
            Explore</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib" to="/login" title="Login">Login</Link>
        </nav>


    );
};


const LoggedInHeader = (props) => {
    return (
        <nav className="pa3 pa4-ns bb b--black-10 black-70">
            <Link className="sans-serif link dim black b f6 f5-ns dib mr3" to="/" title="Home">Fokal</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search" title="Search">
                Search</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/explore" title="Explore">
                Explore</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/manage" title="Manage">
                Manage</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/upload" title="Upload">Upload</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib" to="/logout" title="Logout">Logout</Link>
        </nav>

    );
};

const HeaderContainer = ({isLoggedIn, currentUser}) => {
    return isLoggedIn ? <LoggedInHeader user={currentUser}/> : <LoggedOutHeader/>
};

HeaderContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
};


export {LoggedOutHeader, LoggedInHeader, HeaderContainer};
