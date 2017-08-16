import React, {
    Component
} from 'react'
import {Image} from '../components/image'
import PropTypes from 'prop-types';
import {FetchImages} from '../api'
import {Collection} from "../components/collection";

class ImageCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            url: props.url,
            title: props.title,
            isGrid: false
        };
    }

    loadImageFromServer() {
        let t = this;
        FetchImages(this.state.url)
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
        return (
            <Collection title={this.state.title} images={this.state.images} isGrid={this.state.isGrid} isLoading={this.state.images.length === 0} summary={false}/>
        )
    }
}

ImageCollection.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

const RecentImages = () => {
    return (
        <ImageCollection url="/i/recent?limit=3" title="Recent Images"/>
    )
};

const FeaturedImages = () => {
    return (
        <ImageCollection url="/i/featured?limit=4" title="Featured Images"/>
    )
};

const TrendingImages = () => {
    return (
        <ImageCollection url="/i/hot?limit=4" title="Trending Images"/>
    )
};

const UserImages = (props) => {
    const url = '/u/' + props.match.params.id + '/images?limit=4';
    return (
        <ImageCollection url={url} title={props.match.params.id}/>
    )
};

UserImages.propTypes = {
    match : PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        })
    })
};


export {FeaturedImages, RecentImages, TrendingImages, UserImages,ImageCollection};
