import React, {Component} from 'react'
import {Image} from '../components/image'
import {SearchImages} from '../api'
import {Collection} from "../components/collection"
import CirclePicker from '../components/colorPicker'
import {bindAll} from 'lodash'
import URI from 'urijs'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hex: undefined,
            images: [],
            q: undefined
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
        let url = URI('/i/search');
        if (this.state.hex !== undefined)
            url.addSearch("hex", this.state.hex);
        if (this.state.q !== undefined)
            url.addSearch("q", this.state.q);

        let t = this;
        console.log(url.toString(), this.state);
        SearchImages(url.toString())
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data
                })
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <div className="mw7 pa5 ma2 tc center">
                    <input className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text"
                           onChange={this.handleTextChange}/>

                    <CirclePicker width={500} onChange={this.handleColorChange}
                                  color={this.state.color}/>
                    <span onClick={this.loadImages}
                          className="sans-serif f6 link dim ba ph5 pv3 mb2 dib dark-gray pointer">
                                Search
                    </span>
                </div>
                <Collection images={this.state.images} isGrid={false} isLoading={false} summary={true}/>
            </div>
        )
    }
}

export {Search};
