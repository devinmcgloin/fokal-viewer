import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {RecentImages, FeaturedImages, TrendingImages, UserImages} from './containers/collection';
import {ColorSearch} from './containers/search'
import {NotFound} from './containers/not-found';
import {ImageContainer} from './containers/image';
import {HeaderContainer} from "./components/header"
import {Login} from './containers/login'
import {Join} from './containers/join'
import {UserContainer} from './containers/user'
import {removeHeadersAuth, setHeadersAuth} from "./api"

import './main.css'
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
            <div className="full-bg">
                <HeaderContainer isLoggedIn={this.state.isLoggedIn}/>
                <div className="container is-fluid">
                    <Switch>
                        <Route exact path="/" component={FeaturedImages}/>
                        <Route path="/recent" component={RecentImages}/>
                        <Route path="/trending" component={TrendingImages}/>
                        <Route path="/featured" component={FeaturedImages}/>

                        <Route path="/i/:id" component={ImageContainer}/>
                        <Route path="/u/:id" component={UserContainer}/>
                        <Route path="/u/:id/images" component={UserImages}/>

                        <Route path="/search/color" component={ColorSearch}/>
                        <Route path="/search/text" component={TextSearch}/>

                        <Route path="/login" render={()=><Login onSuccess={this.onLogin}/>}/>
                        <Route path="/join" component={Join}/>
                        <Route path="/upload" component={UploadContainer}/>


                        <Route path="/*" component={NotFound}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
