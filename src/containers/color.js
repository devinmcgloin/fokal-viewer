import React from 'react';
import CirclePicker from '../components/colorPicker';
import {Image} from '../components/image'
import {FetchImages} from '../api'

class ColorSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'adadad',
            images: []
        };
    }

    handleChange = (color, event) => {
        this.setState({
            color: color.hex.slice(1),
            images: []
        });
        this.loadImages(color.hex.slice(1))
    };

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

export {ColorSearch}