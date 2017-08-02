import React  from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

function Header(props) {
    const logoStyle = {
        width: '100%'
    };

    const linkStyle = {
        width: '35px',
        margin: 'auto',
        display: 'block'
    };

    return (
        <div>
        <header>
            <Link to="/" style={linkStyle}><img src={logo} style={logoStyle}/></Link>
        </header>
        </div>

);
}

export { Header };
