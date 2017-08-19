import React, {
    Component
} from 'react'
import {Image} from '../components/image'
import PropTypes from 'prop-types';
import {FetchImages} from '../services/api/api'
import {Collection} from "../components/collection";
import {bindAll} from 'lodash'

class ImageCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            type: 'featured',
            isGrid: false,
            failed: false,
            isLoading: true
        };

        bindAll(this, 'handleChange')
    }

    loadImageFromServer(type) {
        let t = this;
        FetchImages('/i/'+type)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data,
                    isLoading: false
                })
            })
            .catch((err) => t.setState({failed:true}));
    }


    handleChange(type) {
        this.setState({
            type: type,
            images: [],
            isLoading: true
        });
        this.loadImageFromServer(type)
    }

    componentDidMount() {
        this.loadImageFromServer(this.state.type)
    }

    render() {
        return (
            <Collection title={this.state.type} images={this.state.images}
                        isGrid={this.state.isGrid} isLoading={this.state.isLoading}
                        summary={false} handleChange={this.handleChange}/>
        )
    }
}

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



export {ImageCollection, TaggedImages};
