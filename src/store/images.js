import { FetchImage } from '../services/api/retrieval';
import { loadImages } from './persistance';

const REQUEST_IMAGE = 'REQUEST_IMAGE';
const RECEIVE_IMAGE = 'RECEIVE_IMAGE';

const initialState = loadImages() || {};

function requestImage(shortcode) {
  return {
    type: REQUEST_IMAGE,
    shortcode
  };
}

function receiveImage(shortcode, json) {
  return {
    type: RECEIVE_IMAGE,
    shortcode,
    image: json,
    receivedAt: Date.now()
  };
}

function fetchImage(shortcode) {
  return dispatch => {
    dispatch(requestImage(shortcode));
    return FetchImage(shortcode).then(json => dispatch(receiveImage(shortcode, json)));
  };
}

function shouldFetchImage(state, shortcode) {
  const posts = state.images[shortcode];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
}

function fetchImageIfNeeded(shortcode) {
  return (dispatch, getState) => {
    if (shouldFetchImage(getState(), shortcode)) {
      dispatch(requestImage(shortcode));
      return dispatch(fetchImage(shortcode));
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

function images(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IMAGE:
      return Object.assign({}, state, {
        [action.shortcode]: {
          isFetching: true
        }
      });
    case RECEIVE_IMAGE:
      return Object.assign({}, state, {
        [action.shortcode]: {
          shortcode: action.shortcode,
          isFetching: false,
          image: action.image,
          lastUpdated: action.receivedAt
        }
      });
    default:
      return state;
  }
}

export { receiveImage, requestImage, fetchImageIfNeeded, images };
