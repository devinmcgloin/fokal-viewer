import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg'
import PropTypes from 'prop-types'

const LoggedOutHeader = (props) => {


    return (

        <nav className="pa3 pa4-ns">
            <Link className="sans-serif link dim black b f6 f5-ns dib mr3" to="/" title="Home">Fokal</Link>

                <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/featured"
                      title="Home">Featured</Link>
                <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/recent" title="About">Recent</Link>
                <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/trending"
                      title="Store">Trending</Link>
                <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search/color" title="Store">Color
                    Search</Link>
                <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search/text" title="Store">Text
                    Search</Link>
                <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search/geo" title="Store">Geo
                    Search</Link>


                <Link className="sans-serif link dim gray    f6 f5-ns dib" to="/login" title="Contact">Login</Link>

        </nav>


    );
}


const LoggedInHeader = (props) => {
    return (

        <nav className="pa3 pa4-ns">
            <Link className="sans-serif link dim black b f6 f5-ns dib mr3" to="/" title="Home">Fokal</Link>

            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/featured"
                  title="Home">Featured</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/recent" title="About">Recent</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/trending"
                  title="Store">Trending</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search/color" title="Store">Color
                Search</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search/text" title="Store">Text
                Search</Link>
            <Link className="sans-serif link dim gray    f6 f5-ns dib mr3" to="/search/geo" title="Store">Geo
                Search</Link>


            <Link className="sans-serif link dim gray    f6 f5-ns dib" to="/upload" title="Contact">Upload</Link>

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
