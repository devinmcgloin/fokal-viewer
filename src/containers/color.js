import React from 'react';
import {SwatchesPicker} from 'react-color';
import {Image} from '../components/image'

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
        console.log("http://localhost:8000/v0/i/color?hex=" + hex);
        fetch("http://localhost:8000/v0/i/color?hex=" + hex)
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data
                })
            })
            .catch((err) => console.log(err));
    }

    render() {
        const images = this.state.images.map((img) =>
            <Image key={img.permalink} image={img}/>
        );

        const hStyle = {
            fontFamily: ['Montserrat'],
            textAlign: 'center'
        };
        return (
            <div>
                <div>
                    <SwatchesPicker width={500} onChangeComplete={this.handleChange} color={this.state.color}/>
                </div>
                <h1 style={hStyle}>#{this.state.color}</h1>
                {images}
            </div>
        )
    }
}

export {ColorSearch}