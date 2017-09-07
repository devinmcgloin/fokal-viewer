import React, {Component} from 'react'
import {SearchImages} from "../services/api/search";
import {GridCollection} from "../components/collection"
import {bindAll} from 'lodash'
import {Error, NoResults} from '../components/error'
import {Loading} from "../components/loading";
import {ImageCardSmall} from "../components/cards/image/image";
import {Controls} from "../components/collectionControls";
import {UserTitleCard} from "../components/cards/user/user";
import {TagCard} from "../components/cards/tags/tags";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: {images:[], users:[], tags:[]},
            q: '',
            failed: false,
            loading: false,
            type: 'images',
        };
        bindAll(this, 'handleTextChange', 'loadImages');
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value,
            results: {images:[], users:[], tags:[]}
        });
    }

    loadImages() {
        this.setState({loading: true});
        const q = this.state.q;

        if (q === '')
            return;

        const terms = q.split(' ').map(t => t.trim()).filter(t => t !== '');

        let querybody = {
            required_terms: [],
            optional_terms: [],
            excluded_terms: [],
            document_types: ['image', 'user','tag']
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

        console.log(querybody);

        let t = this;
        SearchImages('/search', querybody)
            .then((data) => {
                if (data.ok)
                    data.body.then(
                        d => t.setState({
                            results: d,
                            loading: false
                        })
                    );
                else
                    t.setState({failed: true})

            })
            .catch((err) => console.log(err));
    }

    render() {
        let content;
        if (this.state.loading)
            content = <Loading/>;
        else if (this.state.failed)
            content = <Error/>;
        else if(this.state.type === 'images')
            content = this.state.results.images.length === 0 ? <NoResults/> : <GridCollection cards={this.state.results.images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>;
        else if(this.state.type === 'users')
            content = this.state.results.users.length === 0 ? <NoResults/> : <GridCollection cards={this.state.results.users.map(u => <UserTitleCard key={u.id} usr={u}/>)}/>;
        else if(this.state.type === 'tags')
            content = this.state.results.tags.length === 0 ? <NoResults/> : <GridCollection cards={this.state.results.tags.map(t => <TagCard key={t.id} id={t.id} image={t.image}/>)}/>;

        return (
            <div className="pa3">
                <div className="sans-serif mw7 pa5 pb6 ma2 tc br2 center">
                    <input
                        className="f6 f5-l input-reset bn fl white bg-black-70 pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns ba b--black-70"
                        type="text"
                        onChange={this.handleTextChange}/>
                    <span onClick={this.loadImages}
                          className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-80 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns">
                                Search
                    </span>
                </div>
                <Controls options={["images","users","tags"]} selected={this.state.type} layout="grid" handleLayoutChange={()=>{}} handleTypeChange={(t)=> this.setState({type: t})}/>

                {content}
            </div>
        )
    }
}

export {Search};
