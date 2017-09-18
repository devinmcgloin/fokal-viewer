import React, {Component} from 'react'
import {SearchImages} from "../services/api/search";
import {bindAll} from 'lodash'
import {Error} from '../components/error'
import {Loading} from "../components/loading";
import {Controls} from "../components/collectionControls";
import {Route, Switch} from 'react-router-dom'
import {SearchImagesView, SearchTagsView, SearchUsersView} from "../components/search";
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'

class Search extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            results: {images: [], users: [], tags: []},
            q: '',
            failed: false,
            loading: false,
            type: props.match.params.type,
        };
        bindAll(this, 'handleTextChange', 'loadImages');
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value,
            // results: {images: [], users: [], tags: []}
        });
    }

    loadImages(e) {
        e.preventDefault();
        this.setState({loading: true});
        const q = this.state.q;

        if (q === '')
            return;

        const terms = q.split(' ').map(t => t.trim()).filter(t => t !== '');

        let querybody = {
            required_terms: [],
            optional_terms: [],
            excluded_terms: [],
            document_types: ['image', 'user', 'tag']
        };

        terms.map(t => {
            if (t.startsWith("color:"))
                querybody.color = {hex: t.replace('color:', ''), pixel_fraction: 0.15};
            else if (t.startsWith("+"))
                querybody.optional_terms.push(t.replace('+', ''));
            else if (t.startsWith("-"))
                querybody.excluded_terms.push(t.replace('-', ''));
            else
                querybody.required_terms.push(t);
        });

        let t = this;
        SearchImages('/search', querybody)
            .then((data) => {
                if (data.ok)
                    data.body.then(
                        d => t.setState({
                            results: d,
                            loading: false,
                            failed: false,
                        })
                    );
                else
                    t.setState({failed: true, loading: false})

            })
            .catch((err) => {
                console.log(err);
                t.setState({failed: true, loading: false})
            });
    }

    render() {
        let content = null;
        if (this.state.loading)
            content = <Loading/>;
        else if (this.state.failed)
            content = <Error/>;

        const results = this.state.results;
        const controllerOptions = [{link: '/search/images', tag: 'images'}, {
            link: "/search/users",
            tag: 'users'
        }, {link: '/search/tags', tag: 'tags'}];

        return (
            <div className="ph3 ph4-ns">
                <form onSubmit={this.loadImages} className="sans-serif mw7 pa5-ns pa2 pb6 ma2 tc br2 center">
                    <input
                        className="f6 f5-l input-reset bn fl white bg-black-70 pa3 lh-solid w-75 w-80-l br2-ns br--left-ns ba b--black-70"
                        type="text" id={"query"} name={"query"}
                        onChange={this.handleTextChange}
                        value={this.state.q}
                    />
                    <button
                        onClick={this.loadImages}
                        className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-80 hover-bg-black white pointer w-25 w-20-l br2-ns br--right-ns"><FontAwesome name={'search'}/></button>

                </form>
                <Controls options={controllerOptions} selected={this.state.type} layout="grid"
                          handleLayoutChange={() => {
                          }} handleTypeChange={(t) => this.setState({type: t})}/>

                {content ? content :
                    <Switch>
                        <Route path={"/search/images"}
                               render={() => <SearchImagesView images={results.images}/>}/>
                        <Route path={"/search/users"}
                               render={() => <SearchUsersView users={results.users}/>}/>
                        <Route path={"/search/tags"}
                               render={() => <SearchTagsView tags={results.tags}/>}/>
                    </Switch>
                }
            </div>
        )
    }
}

Search.propTypes = {
    match: PropTypes.object.isRequired
}
export {Search};
