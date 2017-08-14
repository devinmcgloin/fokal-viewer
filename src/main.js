import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {RecentImages, FeaturedImages, TrendingImages} from './containers/collection';
import {ColorSearch} from './containers/search'
import {NotFound} from './containers/not-found';
import {ImageContainer} from './containers/image';
import {HeaderContainer} from "./components/header"
import {Login} from './containers/login/login'
import {Join} from './containers/join'
import {UserContainer} from './containers/user'
import {removeHeadersAuth, setHeadersAuth} from "./api"
import {Footer} from './components/footer'
import 'tachyons/css/tachyons.css'
import 'font-awesome/css/font-awesome.css'
import {UploadContainer} from "./containers/upload";
import {TextSearch} from "./containers/search";

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

    onLogin(googleUser) {
        const jwtToken = googleUser.getAuthResponse().id_token;
        console.log(jwtToken);
        setHeadersAuth(jwtToken);
        this.setState({isLoggedIn: true, appToken: jwtToken})
    }

    onLogout() {
        this.setState({isLoggedIn: false, appToken: ""})
    }

    render() {
        return (
            <div>
                <HeaderContainer isLoggedIn={this.state.isLoggedIn}/>
                <Cta title="Join Fokal" message="Sprioc helps you find images you’ll love and get your own images seen. We use cutting edge machine intelligence in order to make sure your best images rise to the top and help you find the images that you’re looking for." call="Join for Free"/>
                <div>
                    <Switch>
                        <Route exact path="/" component={FeaturedImages}/>
                        <Route path="/recent" component={RecentImages}/>
                        <Route path="/trending" component={TrendingImages}/>
                        <Route path="/featured" component={FeaturedImages}/>

                        <Route path="/i/:id" component={ImageContainer}/>
                        <Route path="/u/:id" component={UserContainer}/>

                        <Route path="/search/color" component={ColorSearch}/>
                        <Route path="/search/text" component={TextSearch}/>

                        <Route path="/login" render={()=><Login onSuccess={this.onLogin} isLoggedIn={this.state.isLoggedIn}/>}/>
                        <Route path="/join" component={Join}/>
                        <Route path="/upload" component={UploadContainer}/>


                        <Route path="/*" component={NotFound}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
}

const Cta = ({title, message, call}) =>
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
                        <a href="/login" className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2">{call}</a>
                    </div>
                </div>
            </article>
        </section>

export default App;
