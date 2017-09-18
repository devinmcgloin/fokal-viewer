/* global process */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './services/registerServiceWorker';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import WebFont from 'webfontloader'
import {ImageCollection, TaggedImages} from './scenes/collection';
import {Search} from './scenes/search'
import {NotFound} from './components/error';
import {ImageContainer} from './scenes/image';
import {HeaderContainer} from "./components/header"
import {Login} from './scenes/auth/login'
import {UserContainer} from './scenes/user'
import {GetJWT, LoggedIn, LogIn, Logout} from "./services/store/auth"
import 'tachyons/css/tachyons.css'
import 'font-awesome/css/font-awesome.css'
import './assets/main.css'
import {UploadContainer} from "./scenes/manage/upload";
import PropTypes from 'prop-types'
import {Account} from "./scenes/manage/patch"
import {ExploreScene} from "./scenes/explore"
import {LogoutPage} from "./scenes/auth/logout"
import ScrollToTop from "./components/scroll";
import Raven from 'raven-js';
import JwtDecode from 'jwt-decode'
import {RefreshToken} from "./services/api/auth";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            appToken: ""
        };

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        if (LoggedIn()) {
            this.setState({isLoggedIn: true, appToken: GetJWT()})
        }
    }

    onLogin(googleUser) {
        const jwtToken = googleUser.getAuthResponse().id_token;
        const tok = JwtDecode(jwtToken),
            unix = Math.round((new Date()).getTime() / 1000);
        console.log(tok.iat, unix, unix - tok.iat);
        RefreshToken(jwtToken)
            .then((data) => {
                if (data.ok)
                    data.body.then(d => {
                        const token = d.token;
                        LogIn(token);
                        this.setState({isLoggedIn: true, appToken: token});
                        Raven.setUserContext({
                            username: tok.sub
                        })
                    });
                else {
                    console.log(jwtToken)
                }

            })

    }


    onLogout() {
        this.setState({isLoggedIn: false, appToken: ""});
        Raven.setUserContext();
        Logout();
    }

    render() {
        return (
            <div>
                <HeaderContainer isLoggedIn={this.state.isLoggedIn}/>
                <ScrollToTop>
                    <div>
                    <Switch>
                        <Route exact path="/:type(recent|trending|)" render={(props) =>
                            <div>
                                {!this.state.isLoggedIn ?
                                    <CallToAction title="Join Fokal"
                                                  message="Fokal helps you find images you’ll love and get your own images seen. We use cutting edge machine intelligence in order to make sure your best images rise to the top and help you find the images that you’re looking for."
                                                  call="Join for Free"/>
                                    : null}
                                <ImageCollection {...props}/>
                            </div>
                        }/>


                            <Route path="/i/:id" component={ImageContainer}/>
                            <Route path="/u/:id" component={UserContainer}/>
                            <Route path="/t/:id" component={TaggedImages}/>

                            <Route path="/search/:type" component={Search}/>

                            <Route path="/login"
                                   render={() => <Login onSuccess={this.onLogin} isLoggedIn={this.state.isLoggedIn}/>}/>
                            <Route path="/logout" render={() => <LogoutPage onSuccess={this.onLogout}/>}/>
                            <Route path="/upload" component={UploadContainer}/>
                            <Route path="/account/settings" component={Account}/>
                            <Route path="/explore" component={ExploreScene}/>
                            <Route path="/*" component={NotFound}/>
                    </Switch>
                    </div>

                </ScrollToTop>
            </div>
        );
    }
}

const CallToAction = ({title, message, call}) =>
    <section className="sans-serif ph3 ph5-ns pv5">
        <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
            <div className="dt-ns dt--fixed-ns w-100">
                <div className="pa3 pa4-ns dtc-ns v-mid">
                    <div>
                        <h2 className="fw4 blue mt0 mb3">{title}</h2>
                        <p className="black-70 measure lh-copy mv0">
                            {message}
                        </p>
                    </div>
                </div>
                <div className="pa3 pa4-ns dtc-ns v-mid">
                    <Link to="/login"
                          className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2">{call}</Link>
                </div>
            </div>
        </article>
    </section>;

CallToAction.propTypes = {
    title: PropTypes.string.isRequired,
    call: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

ReactDOM.render((
        <Router>
            <App/>
        </Router>
    ),
    document.getElementById('root'));

registerServiceWorker();

Raven
    .config('https://98f3dbb4874649db845e711d275f07da@sentry.io/211802')
    .install();
Raven.setTagsContext({
    environment: process.env.NODE_ENV,
});

WebFont.load({
    google: {
        families: ['Montserrat:400,700', 'sans-serif']
    }
});
