import React, {Component} from 'react';
import {Image} from '../components/image'
import {FetchImages} from '../api'

class TextSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            images: []
        };
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value,
            images: []
        });
    };

    loadImages = (e) => {
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
                <div>
                    <h1 className="title" style={{textAlign: 'center'}}>{this.state.text}</h1>
                    {images}
                </div>
            </div>
        )
    }
}

export {TextSearch}