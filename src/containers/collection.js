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
        <ImageCollection url="/i/recent" title="Recent Images"/>
    )
};

class TaggedImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            tag: props.match.params.id,
            isGrid: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tag: nextProps.match.params.id, images:[]});
        this.loadImageFromServer(nextProps.match.params.id)
    }

    loadImageFromServer(tag) {
        let t = this;
        FetchImages('/t/'+tag)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data
                })
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.loadImageFromServer(this.state.tag)
    }

    render() {
        return (
            <Collection title={this.state.tag} images={this.state.images} isGrid={this.state.isGrid} isLoading={this.state.images.length === 0} summary={false}/>
        )
    }
}
const FeaturedImages = () => {
    return (
        <ImageCollection url="/i/featured" title="Featured Images"/>
    )
};

const TrendingImages = () => {
    return (
        <ImageCollection url="/i/hot" title="Trending Images"/>
    )
};



export {FeaturedImages, RecentImages, TrendingImages,ImageCollection, TaggedImages};
