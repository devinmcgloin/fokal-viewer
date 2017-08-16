import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {RecentImages, FeaturedImages, TrendingImages} from './containers/collection';
import {Search} from './containers/search'
import {NotFound} from './containers/not-found';
import {ImageContainer} from './containers/image';
import {HeaderContainer} from "./components/header"
import {Login} from './containers/auth/login'
import {Join} from './containers/join'
import {UserContainer} from './containers/user'
import {setHeadersAuth} from "./api"
import {LogIn, Logout, LoggedIn, GetJWT} from "./auth"
import {Footer} from './components/footer'
import 'tachyons/css/tachyons.css'
import 'font-awesome/css/font-awesome.css'
import {UploadContainer} from "./containers/manage/upload";
import PropTypes from 'prop-types'
import {ManageImages} from "./containers/manage/patch"
import {LogoutPage} from "./containers/auth/logout"

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
                    <Switch>
                        <Route exact path="/" render={() =>
                            <div>
                                {!this.state.isLoggedIn ?
                                    <CallToAction title="Join Fokal"
                                                  message="Fokal helps you find images you’ll love and get your own images seen. We use cutting edge machine intelligence in order to make sure your best images rise to the top and help you find the images that you’re looking for."
                                                  call="Join for Free"/>
                                    : null}
                                <FeaturedImages/>
                            </div>
                        }/>
                        <Route path="/recent" component={RecentImages}/>
                        <Route path="/trending" component={TrendingImages}/>
                        <Route path="/featured" component={FeaturedImages}/>

                        <Route path="/i/:id" component={ImageContainer}/>
                        <Route path="/u/:id" component={UserContainer}/>

                        <Route path="/search" component={Search}/>

                        <Route path="/login"
                               render={() => <Login onSuccess={this.onLogin} isLoggedIn={this.state.isLoggedIn}/>}/>
                        <Route path="/logout" render={()=> <LogoutPage onSuccess={this.onLogout}/>}/>
                        <Route path="/join" component={Join}/>
                        <Route path="/upload" component={UploadContainer}/>
                        <Route path="/manage" component={ManageImages}/>


                        <Route path="/*" component={NotFound}/>
                    </Switch>
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

export default App;
