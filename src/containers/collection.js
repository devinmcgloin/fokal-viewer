import React, {
    Component
} from 'react'
import {Image} from '../components/image'
import PropTypes from 'prop-types';

class ImageCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            url: props.url,
            title: props.title
        };
    }

    loadImageFromServer() {
        let t = this;
        fetch(this.state.url)
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data
                })
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.loadImageFromServer()
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
                <h1 style={hStyle}>{this.state.title}</h1>
                {images}
            </div>
        )
    }
}

ImageCollection.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

const RecentImages = () => {
    return (
        <ImageCollection url="http://localhost:8000/v0/i/recent?limit=3" title="Recent Images"/>
    )
};

const FeaturedImages = () => {
    return (
        <ImageCollection url="http://localhost:8000/v0/i/featured?limit=4" title="Featured Images"/>
    )
};

const TrendingImages = () => {
    return (
        <ImageCollection url="http://localhost:8000/v0/i/hot?limit=4" title="Trending Images"/>
    )
};

const UserImages = (props) => {
    const url = 'http://localhost:8000/v0/u/' + props.match.params.id + '/images?limit=4';
    return (
        <ImageCollection url={url} title={props.match.params.id}/>
    )
};

UserImages.PropTypes = {
    match : PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
};


export {FeaturedImages, RecentImages, TrendingImages, UserImages};
