import React, { Component } from "react";
import PropTypes from "prop-types";
import Imgix from "react-imgix";
import LazyLoad from "react-lazyload";

class Image extends Component {
    constructor(props) {
        super(props);
        this.pixel_xd = props.pixel_xd;
        this.pixel_yd = props.pixel_yd;
        this.url = props.url;
        this.className = props.className;
        this.progressive = props.progressive;
    }

    render() {
        const customParams = this.progressive
            ? { fm: "pjpg", q: 0.6 }
            : { q: 0.6 };
        return (
            <LazyLoad>
                <Imgix
                    aggressiveLoad={true}
                    alt=""
                    src={this.url}
                    className={this.className}
                    customParams={customParams}
                    generateSrcSet={true}
                    width={0.3}
                    height={0.3}
                />
            </LazyLoad>
        );
    }
}

Image.propTypes = {
    pixel_xd: PropTypes.number.isRequired,
    pixel_yd: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    progressive: PropTypes.bool
};

Image.defaultProps = {
    className: "",
    style: {},
    progressive: false
};

const ResponsiveImage = ({ url, imageProps, className }) => (
    <Imgix
        src={url}
        className={className}
        type={"bg"}
        faces={false}
        entropy={true}
        fit={"crop"}
        fluid={true}
        generateSrcSet={true}
        imgProps={imageProps}
        customParams={{ fm: "pjpg" }}
    />
);

ResponsiveImage.propTypes = {
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
    imageProps: PropTypes.object
};

export { Image, ResponsiveImage };
