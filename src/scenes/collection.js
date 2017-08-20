import React, {
    Component
} from 'react'
import PropTypes from 'prop-types';
import {FetchImages} from '../services/api/api'
import {GridCollection, LinearCollection} from "../components/collection";
import {bindAll} from 'lodash'
import {Loading} from "../components/loading"
import FontAwesome from 'react-fontawesome'

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

        bindAll(this, 'handleChange', 'handleLayoutChange')
    }

    loadImageFromServer(type) {
        let t = this;
        FetchImages('/i/' + type)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data,
                    isLoading: false
                })
            })
            .catch((err) => t.setState({failed: true}));
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
        else if (this.state.isGrid)
            content = <GridCollection images={this.state.images}/>;
        else
            content = <LinearCollection images={this.state.images} isSummary={true}/>;

        const layoutToggle = <FontAwesome className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                                          name={this.state.isGrid ? "align-justify" : "th-large"}
                                          onClick={this.handleLayoutChange}/>;

        return (
            <div className="sans-serif ph3 ph4-ns">
                    <h1 className="tc f1" style={{textTransform: 'capitalize'}}>{this.state.type}</h1>

                    <section className="inline-flex">
                    <span className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                          onClick={() => this.handleChange("featured")}>Featured</span>
                        <span className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                              onClick={() => this.handleChange("trending")}>Trending</span>
                        <span className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                              onClick={() => this.handleChange("recent")}>Recent</span>
                        {layoutToggle}
                    </section>

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
        FetchImages('/t/' + tag)
            .then(function (data) {
                console.log(data);
                t.setState({
                    images: data,
                    isLoading: false
                })
            })
            .catch((err) => console.log(err));
    }

    componentDidMount() {
        this.loadImageFromServer(this.state.tag)
    }

    render() {

        return (
            <div className="sans-serif">
                <h1 className="tc f1" style={{textTransform: 'lowercase'}}>#{this.state.tag}</h1>
                {this.state.isLoading ? <Loading/> : <LinearCollection images={this.state.images} isSummary={true}/>}
            </div>
        )
    }
}


export {ImageCollection, TaggedImages};
