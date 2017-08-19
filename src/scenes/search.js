import React, {Component} from 'react'
import {Image} from '../components/image'
import {SearchImages} from '../services/api/api'
import {Collection} from "../components/collection"
import CirclePicker from '../components/colorPicker'
import {bindAll} from 'lodash'
import URI from 'urijs'
import {BlockPicker} from 'react-color'


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
                <div className="sans-serif mw7 pa5 ma2 tc br2 center bg-lightest-blue ba b--light-blue">
                    <input
                        className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                        type="text"
                        onChange={this.handleTextChange}/>
                    <span onClick={this.loadImages}
                          className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns">
                                Search
                    </span>
                    <div>
                        <CirclePicker onChange={this.handleColorChange}
                                     color={this.state.color}/>
                    </div>

                </div>
                <Collection images={this.state.images} isGrid={false} isLoading={false} summary={true}/>
            </div>
        )
    }
}

export {Search};
