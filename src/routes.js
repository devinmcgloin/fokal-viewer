import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {FeaturedImages} from './containers/featured';
import {TaggedImages} from './containers/tagged';
import {NotFound} from './containers/not-found';
import {ImageContainer} from './containers/image';
import {Header} from "./components/header"
import {createBrowserHistory} from 'history'

function Routes() {
    return (
        <div>
            <Header/>
                <Switch>
                    <Route exact path="/" component={FeaturedImages}/>
                    <Route path="/tags" component={TaggedImages}/>
                    <Route path="/i/:id" component={ImageContainer}/>
                    <Route path="/*" component={NotFound}/>
                </Switch>
        </div>
    );
}

export default Routes;
