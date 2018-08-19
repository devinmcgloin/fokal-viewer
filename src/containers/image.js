import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageComponent from '../components/image';
import { fetchImageIfNeeded } from '../store/images';

class Image extends Component {
  componentDidMount = () => {
    const { dispatch, shortcode } = this.props;
    dispatch(fetchImageIfNeeded(shortcode));
  };
  render = () => <ImageComponent {...this.props} />;
}
const mapStateToProps = (state, props) => {
  const shortcode = props.match.params.id;
  const { isLoading, isFailed, image } = state.images[shortcode] || {
    isLoading: true,
    isFailed: false,
    image: {}
  };
  const username = state.auth.username;
  return {
    shortcode,
    image,
    isLoading,
    isFailed,
    username
  };
};

const ImageContainer = connect(mapStateToProps)(Image);

export default ImageContainer;
