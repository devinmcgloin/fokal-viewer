import React, {Component} from 'react'
import {FetchImages} from "../services/api/retrieval";
import {GridCollection, LinearCollection} from "../components/collection";
import {bindAll} from 'lodash'
import {Loading} from "../components/loading"
import PropTypes from 'prop-types'
import Raven from 'raven-js'
import {Error} from "../components/error";
import {ImageCardSmall} from "../components/cards/image/image";
import {Controls} from "../components/collectionControls";

class ImageCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            type: 'recent',
            isGrid: true,
            failed: false,
            isLoading: true
        };

        bindAll(this, 'handleChange', 'handleLayoutChange')
    }

    loadImageFromServer(type) {
        let t = this;
        FetchImages('/images/' + type)
            .then(function (data) {
                console.log(data);
                switch (data.ok) {
                    case true:
                        data.body.then(b => t.setState({images: b, isLoading: false}))
                        break;
                    case false:
                        t.setState({
                            isLoading: false,
                            failed: true
                        });
                        Raven.captureException(new Error("Invalid Response code from server."), {code: data.code})
                }

            })
    }


    handleChange(type) {
        this.setState({
            type: type,
            images: [],
            isLoading: true,
        });
        this.loadImageFromServer(type)
    }

    handleLayoutChange(e) {
        this.setState((prevState) => ({isGrid: !prevState.isGrid}))
    }

    componentDidMount() {
        this.loadImageFromServer(this.state.type)
    }

    render() {

        let content;
        if (this.state.isLoading)
            content = <Loading/>;
        else if (this.state.failed)
            content = <Error/>;
        else if (this.state.isGrid)
            content = <GridCollection cards={this.state.images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>;
        else
            content = <LinearCollection images={this.state.images}/>;

        return (
            <div className="sans-serif ph3 ph4-ns pv3">
                <Controls options={["recent", "featured", "trending"]} selected={this.state.type}
                          layout={this.state.isGrid ? 'grid' : 'inline'}
                          handleLayoutChange={(l) => this.setState({isGrid: l === 'grid'})}
                          handleTypeChange={(t) => this.handleChange(t)}/>
                {content}
            </div>
        )

    }
}

class TaggedImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            tag: props.match.params.id,
            isLoading: true,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tag: nextProps.match.params.id, images: []});
        this.loadImageFromServer(nextProps.match.params.id)
    }

    loadImageFromServer(tag) {
        let t = this;
        FetchImages('/tags/' + tag)
            .then(function (data) {
                switch (data.ok) {
                    case true:
                        data.body.then(b => t.setState({images: b, isLoading: false}))
                        break;
                    case false:
                        t.setState({
                            isLoading: false,
                            failed: true
                        });
                        Raven.captureException(new Error("Invalid Response code from server."), {code: data.code})
                }
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.loadImageFromServer(this.state.tag)
    }

    render() {
        let content;
        if (this.state.isLoading)
            content = <Loading/>;
        else if (this.state.failed)
            content = <Error/>;
        else
            content = <GridCollection cards={this.state.images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>;
        return (
            <div className="sans-serif pa3 pa4-ns">
                <h1 className="tc f1" style={{textTransform: 'lowercase'}}>#{this.state.tag}</h1>
                {content}
            </div>
        )
    }
}

TaggedImages.propTypes = {
    match: PropTypes.object,
}


export {ImageCollection, TaggedImages};
