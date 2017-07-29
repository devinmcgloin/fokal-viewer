import React  from 'react';
import { Link } from 'react-router-dom';
import { Search } from './search';

function Header(props) {
    return (
        <div>
        <header>
            <h1>Sprioc</h1>
            <Search/>
            <ul>
                <li><Link to='/tags'>Tags</Link></li>
                <li><Link to='/featured'>Featured</Link></li>
                <li><Link to='/new'>New</Link></li>
                <li><Link to='/user'>User</Link></li>
            </ul>
        </header>
        </div>

);
}

export { Header };
