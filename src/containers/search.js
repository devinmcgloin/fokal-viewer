import React, {Component} from 'react'
import {Image} from '../components/image'
import {FetchImages} from '../api'
import {Collection} from "../components/collection"
import CirclePicker from '../components/colorPicker'
import {bindAll} from 'lodash'

class TextSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            images: []
        };
        bindAll(this, 'handleChange', 'loadImages');
    }

    handleChange(e) {
        this.setState({
            text: e.target.value,
            images: []
        });
    };

    loadImages(e) {
        e.preventDefault();
        const t = this;
        FetchImages("/i/text?q=" + t.state.text)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data
                })
            })
            .catch((err) => console.log(err));
    };

    render() {

        return (
            <div>
                <div className="measure-wide center">

                <form onSubmit={this.loadImages}>
                    <input className="input-reset ba b--black-20 pa2 mb2 db w-100" type="text" onChange={this.handleChange}/>
                </form>
                </div>
                <Collection title={this.state.text} images={this.state.images} isGrid={false} isLoading={this.state.images === null}
                            summary={true}/>
            </div>
        )
    }
}


class ColorSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'adadad',
            images: []
        };
        bindAll(this, 'handleChange', 'loadImages');
    }

    handleChange(color, event) {
        this.setState({
            color: color.hex.slice(1),
            images: []
        });
        this.loadImages(color.hex.slice(1))
    }

    loadImages(hex) {
        let t = this;
        FetchImages("/i/color?hex=" + hex)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data
                })
            })
            .catch((err) => console.log(err, hex));
    }

    render() {
        return (
            <div>
                <div>
                    <CirclePicker width={500} onChangeComplete={this.handleChange} color={this.state.color}/>
                </div>
                <Collection title={'#'+this.state.color} images={this.state.images} isGrid={false} isLoading={false} summary={true}/>
            </div>
        )
    }
}

export {TextSearch, ColorSearch};
