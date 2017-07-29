import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {RecentImages, FeaturedImages, TrendingImages, UserImages} from './containers/collection';
import {NotFound} from './containers/not-found';
import {ImageContainer} from './containers/image';
import {Header} from "./components/header"
import './main.css'

function App() {
    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path="/"
                       component={FeaturedImages}/>
                <Route path="/i/recent" component={RecentImages}/>
                <Route path="/i/trending" component={TrendingImages}/>
                <Route path="/i/:id" component={ImageContainer}/>
                <Route path="/u/:id/images" component={UserImages}/>

                <Route path="/*" component={NotFound}/>
            </Switch>
        </div>
    );
}

export default App;
