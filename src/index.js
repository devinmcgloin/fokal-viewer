/* global process */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './services/registerServiceWorker';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { ImageCollection, TaggedImages } from './scenes/collection';
import { SearchContainer } from './scenes/search';
import { NotFound } from './components/error';
import { ImageContainer } from './scenes/image';
import { Header } from './components/header';
import { Join, Login } from './scenes/auth/join';
import { UserContainer } from './scenes/user';
import { GetJWT, LoggedIn, LogIn, Logout } from './services/store/auth';
import 'tachyons/css/tachyons.css';
import 'font-awesome/css/font-awesome.css';
import './assets/main.css';
import { ImageUpload, ImageModify } from './scenes/manage/upload';
import CallToAction from './components/call-to-action';
import { Account } from './scenes/manage/patch';
import { FeaturedScene } from './scenes/featured';
import { ExploreScene } from './scenes/explore/explore';
import { LogoutPage } from './scenes/auth/logout';
import ScrollToTop from './components/scroll';
import Raven from 'raven-js';
import JwtDecode from 'jwt-decode';
import { RefreshToken, CreateUser } from './services/api/auth';
import { bindAll } from 'lodash';
import { TermsOfService, PrivacyPolicy } from './static/legal';
import { Why } from './static/why';
import RecordPageView from './components/analytics';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      appToken: ''
    };

    bindAll(this, 'onLogout', 'onLogin', 'refreshAuthStatus');
  }

  componentDidMount() {
    this.pollAuthStatus();
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  pollAuthStatus() {
    var self = this;
    setTimeout(function() {
      self.refreshAuthStatus();
      self._timer = setInterval(self.refreshAuthStatus, 10000);
    }, 1000);
  }

  refreshAuthStatus() {
    LoggedIn()
      ? this.setState({ isLoggedIn: true, appToken: GetJWT() })
      : this.setState({ isLoggedIn: false, appToken: '' });
  }

  onLogin(googleUser) {
    const jwtToken = googleUser.getAuthResponse().id_token,
      tok = JwtDecode(jwtToken);
    this.setState({ isLoggedIn: true, appToken: jwtToken });
    LogIn(jwtToken);
    setTimeout(
      () =>
        RefreshToken(jwtToken).then(data => {
          if (data.ok)
            data.body.then(d => {
              const token = d.token;
              LogIn(token);
              this.setState({
                isLoggedIn: true,
                appToken: token
              });
              Raven.setUserContext({
                username: tok.sub
              });
            });
          else {
            CreateUser(jwtToken).then(data => {
              if (data.ok)
                data.body.then(d => {
                  const token = d.token;
                  LogIn(token);
                  this.setState({
                    isLoggedIn: true,
                    appToken: token
                  });
                  Raven.setUserContext({
                    username: tok.sub
                  });
                });
            });
          }
        }),
      1000
    );
  }

  onLogout() {
    this.setState({ isLoggedIn: false, appToken: '' });
    Raven.setUserContext();
    Logout();
  }

  render() {
    return (
      <div>
        <Header />
        <ScrollToTop>
          <div>
            <RecordPageView>
              <Switch>
                <Route
                  exact
                  path="/:type(recent|trending|)"
                  render={props => (
                    <div>
                      {!this.state.isLoggedIn ? (
                        <CallToAction
                          title="Join Fokal"
                          message="Fokal helps you find images you’ll love and get your own images seen. We use cutting edge machine intelligence in order to make sure your best images rise to the top and help you find the images that you’re looking for."
                          call="Join for Free"
                        />
                      ) : null}
                      <ImageCollection {...props} />
                    </div>
                  )}
                />

                <Route path="/i/:id" component={ImageContainer} />
                <Route path="/u/:id" component={UserContainer} />
                <Route path="/t/:id" component={TaggedImages} />

                <Route path="/search" component={SearchContainer} />

                <Route
                  path="/join"
                  render={() => (
                    <Join onSuccess={this.onLogin} isLoggedIn={this.state.isLoggedIn} />
                  )}
                />
                <Route
                  path="/login"
                  render={() => (
                    <Login onSuccess={this.onLogin} isLoggedIn={this.state.isLoggedIn} />
                  )}
                />

                <Route path="/logout" render={() => <LogoutPage onSuccess={this.onLogout} />} />
                <Route path="/upload" component={ImageUpload} />
                <Route path="/manage/:id" component={ImageModify} />
                <Route path="/account/settings" component={Account} />
                <Route path="/featured" component={FeaturedScene} />
                <Route path="/explore" component={ExploreScene} />

                <Route path="/tos" component={TermsOfService} />
                <Route path="/privacy" component={PrivacyPolicy} />
                <Route path="/why" component={Why} />
                <Route path="/*" component={NotFound} />
              </Switch>
            </RecordPageView>
          </div>
        </ScrollToTop>
      </div>
    );
  }
}

registerServiceWorker();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://98f3dbb4874649db845e711d275f07da@sentry.io/211802').install();

  Raven.setTagsContext({
    environment: process.env.NODE_ENV
  });
}
