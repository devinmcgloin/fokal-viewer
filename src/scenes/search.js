import React, {Component} from 'react'
import {SearchImages} from "../services/api/search";
import {GridCollection} from "../components/collection"
import {bindAll} from 'lodash'
import {NoResults} from '../components/error'
import {Loading} from "../components/loading";
import {Error} from "../components/error";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            q: '',
            failed: false,
            loading: false,
        };
        bindAll(this, 'handleColorChange', 'handleTextChange', 'loadImages');
    }

    handleColorChange(color, event) {
        this.setState({
            hex: color.hex.slice(1),
            images: []
        });
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value,
            images: []
        });
    }

    loadImages() {
        this.setState({loading: true});
        const q = this.state.q;

        if (q === '')
            return;

        const terms = q.split(' ').map(t => t.trim());

        let querybody = {
            required_terms: terms.filter(t => !t.startsWith('+') && !t.startsWith('-')),
            optional_terms: terms.filter(t => t.startsWith('+')).map(t => t.slice(1)),
            excluded_terms: terms.filter(t => t.startsWith('-')).map(t => t.slice(1)),
            document_types: ['image']
        };

        console.log(querybody);

        let t = this;
        SearchImages('/search', querybody)
            .then( (data) => {
                if (data.ok)
                    data.body.then(
                        d => t.setState({
                            images: d.images,
                            loading: false
                        })
                    )
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
        else if (this.state.images.length === 0)
            content = <NoResults/>;
        else
            content = <GridCollection images={this.state.images}/>;
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

                {content}
            </div>
        )
    }
}

export {Search};
