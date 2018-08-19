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
    receivedAt: Date.now(),
    isLoading: false
  };
}

function fetchImage(shortcode) {
  return dispatch => {
    dispatch(requestImage(shortcode));
    return FetchImage(shortcode).then(json => dispatch(receiveImage(shortcode, json.body)));
  };
}

function shouldFetchImage(state, shortcode) {
  const posts = state.images[shortcode];
  if (!posts) {
    return true;
  } else if (posts.isLoading) {
    return false;
  }
}

function fetchImageIfNeeded(shortcode) {
  return (dispatch, getState) => {
    if (shouldFetchImage(getState(), shortcode)) {
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
          isLoading: true
        }
      });
    case RECEIVE_IMAGE:
      return Object.assign({}, state, {
        [action.shortcode]: {
          shortcode: action.shortcode,
          isLoading: false,
          image: action.image,
          lastUpdated: action.receivedAt
        }
      });
    default:
      return state;
  }
}

export { receiveImage, requestImage, fetchImageIfNeeded, images };
