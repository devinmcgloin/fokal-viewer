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
        const images = this.state.images.map((img) =>
            <Image key={img.permalink} image={img}/>
        );

        return (
            <div>
                <div className="columns">
                    <div className="column is-three-quarters">
                        <form onSubmit={this.loadImages}>
                        <input className="input" type="text" onChange={this.handleChange} />
                        </form>
                    </div>
                </div>
                <Collection images={this.state.images} isGrid={false}/>
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
        const images = this.state.images.map((img) =>
            <Image key={img.permalink} image={img}/>
        );

        return (
            <div>
                <div>
                    <CirclePicker width={500} onChangeComplete={this.handleChange} color={this.state.color}/>
                </div>
                <h1 className="title" style={{textAlign: 'center'}}>#{this.state.color}</h1>
                {images}
            </div>
        )
    }
}

export {TextSearch, ColorSearch};
