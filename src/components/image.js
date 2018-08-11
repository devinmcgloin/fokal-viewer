import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Imgix from 'react-imgix';

class Image extends Component {
    constructor(props) {
        super(props);
        this.url = props.url;
        this.className = props.className;
        this.progressive = props.progressive;
    }

    render() {
        const customParams = this.progressive ? { fm: 'pjpg', q: 0.6 } : { q: 0.6 };
        return (
            <Imgix
                aggressiveLoad={true}
                alt=""
                src={this.url}
                className={this.className}
                customParams={customParams}
                generateSrcSet={true}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
}

Image.propTypes = {
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    progressive: PropTypes.bool
};

Image.defaultProps = {
    className: '',
    style: {},
    progressive: false,
    width: 0.3,
    height: 0.3
};

const ResponsiveImage = ({ url, imageProps, className }) => (
    <Imgix
        src={url}
        className={className}
        type={'bg'}
        height={0.6}
        width={0.6}
        generateSrcSet={true}
        imgProps={imageProps}
        customParams={{ fm: 'pjpg' }}
    />
);

ResponsiveImage.propTypes = {
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    imageProps: PropTypes.object
};

export { Image, ResponsiveImage };
