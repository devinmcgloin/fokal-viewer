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
import queryString from 'query-string'

class Search extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        let q = queryString.parse(props.location.search);
        this.state = {
            results: {images: [], users: [], tags: []},
            q: q.q || '',
            failed: false,
            loading: false,
            type: props.match.params.type,
            history: props.history,
        };
        bindAll(this, 'handleTextChange', 'loadImages');
    }

    componentDidMount() {
        this.loadImages()
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value,
            // results: {images: [], users: [], tags: []}
        });
    }

    loadImages() {
        this.setState({loading: true});
        const q = this.state.q;

        if (q === '') {
            this.setState({loading: false});
            return;
        }

        this.state.history.push({
            search: '?q=' + encodeURIComponent(q)
        });

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
                querybody.optional_terms.push(t.replace('+', '').trim());
            else if (t.startsWith("-"))
                querybody.excluded_terms.push(t.replace('-', '').trim());
            else
                querybody.required_terms.push(t.trim());
        });

        querybody.required_terms = querybody.required_terms.filter((s) => s !== '');
        querybody.optional_terms = querybody.optional_terms.filter((s) => s !== '');
        querybody.excluded_terms = querybody.excluded_terms.filter((s) => s !== '');

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
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.loadImages()
                }} className="sans-serif mw7 pa5-ns pa2 pb6 ma2 tc br2 center">
                    <input
                        className="f5 input-reset bn fl white bg-black-70 pa3 lh-solid w-75 w-80-l br2 br--left ba b--black-70 h3"
                        type="text" id={"query"} name={"query"}
                        onChange={this.handleTextChange}
                        value={this.state.q}
                        style={{height: '3rem'}}
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            this.loadImages()
                        }}
                        className="f5 button-reset fl pv3 tc bn bg-animate bg-black-80 hover-bg-black white pointer w-25 w-20-l br2 br--right"
                        style={{height: '3rem'}}><FontAwesome name={'search'}/></button>

                </form>
                <Controls options={controllerOptions}
                          selected={this.state.type}
                          layout="grid"
                          handleLayoutChange={() => {}}
                          handleTypeChange={(t) => this.setState({type: t})}
                query={'?q=' + encodeURIComponent(this.state.q)}/>

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
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export {Search};
