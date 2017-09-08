import React, {Component} from 'react'
import {bindAll} from 'lodash'
import PropTypes from 'prop-types'

class Image extends Component {
    constructor(props) {
        super(props);
        this.pixel_xd = props.pixel_xd;
        this.pixel_yd = props.pixel_yd;
        this.url = props.url;
        this.className = props.className;
this.style = props.style;

        this.state = {
            isLoaded: false,
            failed: false
        };

        bindAll(this, 'handleLoad', 'handleLoadFailure')
    }

    handleLoad() {
        this.setState({isLoaded: true})
    }

    handleLoadFailure() {
        this.setState({failed: true})
    }

    render() {
        const style = this.state.isLoaded ? this.style : Object.assign( {
            paddingBottom: (this.pixel_yd / this.pixel_xd) * 100 + '%',
        }, this.style);

        return <img
            alt=""
            src={this.url}
            className={this.className}
            style={style}
            onLoad={this.handleLoad}
            onError={this.handleLoadFailure}
        />
    }
}

Image.propTypes = {
    pixel_xd: PropTypes.number.isRequired,
    pixel_yd: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object
};

Image.defaultProps = {
    className: '',
    style: {}
};


export {Image};