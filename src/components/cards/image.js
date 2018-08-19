import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from '../imgix';
import Measure from 'react-measure';
import LazyLoad from 'react-lazyload';

class ImageCard extends Component {
  constructor(props) {
    super(props);
    const windowWidth = window.innerWidth,
      fullWidth = this.props.fullWidth;

    let cardWidth;
    if (windowWidth > 960 && !fullWidth) {
      cardWidth = (windowWidth - (64 + 16 * 3)) / 3;
    } else if (windowWidth > 480 && !fullWidth) {
      cardWidth = (windowWidth - (64 + 16 * 2)) / 2;
    } else {
      cardWidth = windowWidth - (32 + 16);
    }

    this.state = {
      dimensions: {
        width: cardWidth
      }
    };
  }

  render() {
    const { width } = this.state.dimensions,
      image = this.props.image,
      fullWidth = this.props.fullWidth,
      color = image.colors[0],
      aspect = image.metadata.pixel_yd / image.metadata.pixel_xd,
      height = width * aspect;

    return (
      <Measure
        bounds
        onResize={contentRect => {
          contentRect.bounds.width > 30 && this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            className="db w-100"
            style={{
              height: height,
              backgroundColor: color ? color.hex : '#ededed'
            }}
          >
            <Link to={'/i/' + image.id} className="relative">
              <LazyLoad height={height}>
                <Image
                  url={image.src_links.raw}
                  className={'bg-center cover'}
                  width={fullWidth ? 0.8 : 0.3}
                  height={fullWidth ? 0.8 : 0.3}
                />
              </LazyLoad>
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
  }).isRequired,
  fullWidth: PropTypes.bool.isRequired
};

ImageCard.defaultProps = {
  fullWidth: false
};

export { ImageCard };
