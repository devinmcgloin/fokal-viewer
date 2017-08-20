import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './services/registerServiceWorker';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import WebFont from 'webfontloader'
import {ImageCollection, TaggedImages} from './scenes/collection';
import {Search} from './scenes/search'
import {NotFound} from './scenes/not-found';
import {ImageContainer} from './scenes/images/image';
import {HeaderContainer} from "./components/header"
import {Login} from './scenes/auth/login'
import {Join} from './scenes/auth/join'
import {UserContainer} from './scenes/user'
import {setHeadersAuth} from "./services/api/api"
import {GetJWT, LoggedIn, LogIn, Logout} from "./services/store/auth"
import {Footer} from './components/footer'
import 'tachyons/css/tachyons.css'
import 'font-awesome/css/font-awesome.css'
import {UploadContainer} from "./scenes/manage/upload";
import PropTypes from 'prop-types'
import {ManageImages} from "./scenes/manage/patch"
import {LogoutPage} from "./scenes/auth/logout"
import ScrollToTop from "./components/scroll";

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
            setHeadersAuth();
            this.setState({isLoggedIn: true, appToken: GetJWT()})
        }
    }

    onLogin(googleUser) {
        const jwtToken = googleUser.getAuthResponse().id_token;
        LogIn(jwtToken);
        setHeadersAuth();
        this.setState({isLoggedIn: true, appToken: jwtToken})
    }


    onLogout() {
        this.setState({isLoggedIn: false, appToken: ""});
        Logout();
    }

    render() {
        return (
            <div>
                <HeaderContainer isLoggedIn={this.state.isLoggedIn}/>
                <div>
                    <ScrollToTop>
                        <Switch>
                            <Route exact path="/" render={() =>
                                <div>
                                    {!this.state.isLoggedIn ?
                                        <CallToAction title="Join Fokal"
                                                      message="Fokal helps you find images you’ll love and get your own images seen. We use cutting edge machine intelligence in order to make sure your best images rise to the top and help you find the images that you’re looking for."
                                                      call="Join for Free"/>
                                        : null}
                                    <ImageCollection/>
                                </div>
                            }/>

                            <Route path="/i/:id" component={ImageContainer}/>
                            <Route path="/u/:id" component={UserContainer}/>
                            <Route path="/t/:id" component={TaggedImages}/>

                            <Route path="/search" component={Search}/>

                            <Route path="/login"
                                   render={() => <Login onSuccess={this.onLogin} isLoggedIn={this.state.isLoggedIn}/>}/>
                            <Route path="/logout" render={() => <LogoutPage onSuccess={this.onLogout}/>}/>
                            <Route path="/join" component={Join}/>
                            <Route path="/upload" component={UploadContainer}/>
                            <Route path="/manage" component={ManageImages}/>


                            <Route path="/*" component={NotFound}/>
                        </Switch>
                    </ScrollToTop>
                </div>
                <Footer/>
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
WebFont.load({
    google: {
        families: ['Montserrat:400,700', 'sans-serif']
    }
});