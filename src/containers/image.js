import { connect } from 'react-redux';
import ImageComponent from '../components/image';
import { fetchImageIfNeeded } from '../store/images';

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

const mapDispatchToProps = (dispatch, props) => {
  const { shortcode } = props;
  return {
    requestImage: () => dispatch(fetchImageIfNeeded(shortcode))
  };
};

const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageComponent);

export default ImageContainer;
