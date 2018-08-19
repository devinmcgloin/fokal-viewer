/* global process */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './services/registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ImageCollection, TaggedImages } from './containers/collection';
import { SearchContainer } from './containers/search';
import { NotFound } from './components/error';
import { ImageContainer } from './containers/image';
import HeaderContainer from './containers/header';
import { Join, LoginContainer } from './containers/auth/join';
import { UserContainer } from './containers/user';
import 'tachyons/css/tachyons.css';
import 'font-awesome/css/font-awesome.css';
import './assets/main.css';
import { ImageSubmit, ImageModify } from './containers/manage/submit';
import CTARoute from './containers/call-to-action';
import { Account } from './containers/manage/patch';
import { FeaturedScene } from './containers/featured';
import { ExploreScene } from './containers/explore/explore';
import { LogoutContainer } from './containers/auth/logout';
import ScrollToTop from './components/scroll';
import Raven from 'raven-js';
import { TermsOfService, PrivacyPolicy } from './static/legal';
import { Why } from './static/why';
import RecordPageView from './components/analytics';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { saveStore } from './store/persistance';
import Authenticated from './containers/auth/routes';
import fokalReducer from './store/reducers';

const store = createStore(
  fokalReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveStore(store.getState()));

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <ScrollToTop>
          <div>
            <RecordPageView>
              <Switch>
                <CTARoute
                  exact
                  path="/:type(recent|trending|)"
                  title="Join Fokal"
                  message="Fokal helps you find images you’ll love and get your own images seen. We use cutting edge machine intelligence in order to make sure your best images rise to the top and help you find the images that you’re looking for."
                  call="Join for Free"
                  Container={ImageCollection}
                />

                <Route path="/i/:id" component={ImageContainer} />
                <Route path="/u/:id" component={UserContainer} />
                <Route path="/t/:id" component={TaggedImages} />

                <Route path="/search" component={SearchContainer} />

                <Route path="/join" component={LoginContainer} />
                <Route path="/login" component={LoginContainer} />

                <Route path="/featured" component={FeaturedScene} />
                <Route path="/explore" component={ExploreScene} />

                <Route path="/tos" component={TermsOfService} />
                <Route path="/privacy" component={PrivacyPolicy} />
                <Route path="/why" component={Why} />

                <Authenticated path="/logout" Container={LogoutContainer} />
                <Authenticated path="/submit" Container={ImageSubmit} />
                <Authenticated path="/manage/:id" Container={ImageModify} />
                <Authenticated path="/account/settings" Container={Account} />

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
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
  Raven.config('https://98f3dbb4874649db845e711d275f07da@sentry.io/211802').install();

  Raven.setTagsContext({
    environment: process.env.NODE_ENV
  });
}
