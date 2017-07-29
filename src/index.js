import React from 'react';
import ReactDOM from 'react-dom';
import App from './main';
import registerServiceWorker from './util/registerServiceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import WebFont from 'webfontloader'

ReactDOM.render((
    <Router>
        <App/>
    </Router>
        ),
    document.getElementById('root'));

registerServiceWorker();
WebFont.load({
    google: {
        families: ['Montserrat:400,700', 'sans-serif']
    }
});