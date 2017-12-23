import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image } from "../image";
import Measure from "react-measure";

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                width: -1,
                height: -1
            }
        };
    }

    render() {
        const { width } = this.state.dimensions,
            image = this.props.image,
            color = image.colors[0];

        return (
            <Measure
                bounds
                onResize={contentRect => {
                    this.setState({ dimensions: contentRect.bounds });
                }}
            >
                {({ measureRef }) => (
                    <div
                        ref={measureRef}
                        style={{
                            height:
                                width !== -1
                                    ? width *
                                      (image.metadata.pixel_yd /
                                          image.metadata.pixel_xd)
                                    : 300,
                            width: width,
                            backgroundColor: color ? color.hex : "#ededed"
                        }}
                    >
                        <Link to={"/i/" + image.id} className="relative">
                            <Image
                                url={image.src_links.raw}
                                className={"bg-center cover br2 shadow-5 "}
                            />
                        </Link>
                    </div>
                )}
            </Measure>
        );
    }
}

ImageCard.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src_links: PropTypes.object,
        colors: PropTypes.array.isRequired,
        permalink: PropTypes.string.isRequired,
        metadata: PropTypes.shape({
            location: PropTypes.shape({
                X: PropTypes.number,
                Y: PropTypes.number
            }),
            capture_time: PropTypes.string
        }),
        user: PropTypes.shape({
            permalink: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    }).isRequired
};

export { ImageCard };
