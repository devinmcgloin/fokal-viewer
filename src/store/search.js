import { Search } from '../services/api/search';
import convert from 'color-convert';
import { loadSearch } from './persistance';
const REQUEST_QUERY = 'REQUEST_QUERY';
const RECEIVE_QUERY = 'RECEIVE_QUERY';
const SET_QUERY = 'SET_QUERY';

const rgbRegex = /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/,
  hexRegex = /#[A-Fa-f0-9]{6}/,
  hslRegex = /hsl\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/;

const extractTags = str => {
  // eslint-disable-next-line no-useless-escape
  const exc = /\-\w+/,
    opt = /\+\w+/;

  let optional_terms = str.match(opt);
  str = str.replace(opt, '');

  let excluded_terms = str.match(exc);
  str = str.replace(exc, '');

  return [
    str.trim(),
    optional_terms ? optional_terms.splice(-2, 2).map(t => t.slice(1)) : [],
    excluded_terms ? excluded_terms.splice(-2, 2).map(t => t.slice(1)) : []
  ];
};

const extractColor = str => {
  const digits = /\d+/g;
  if (str.search(rgbRegex) !== -1) {
    let m = str.match(rgbRegex);
    let values = m[0].match(digits);
    let hex = convert.rgb.hex(values[0], values[1], values[2]);
    let query = str.replace(rgbRegex, '');
    return [query.trim(), '#' + hex];
  } else if (str.search(hslRegex) !== -1) {
    let m = str.match(hslRegex);
    let values = m[0].match(digits);
    let hex = convert.hsl.hex(values[0], values[1], values[2]);
    let query = str.replace(hslRegex, '');
    return [query.trim(), '#' + hex];
  } else if (str.search(hexRegex) !== -1) {
    let m = str.match(hexRegex);
    let query = str.replace(hexRegex, '');
    return [query.trim(), m[0]];
  } else return [str.trim(), null];
};

const parse = str => {
  let query_body = {};
  let [q, color] = extractColor(str);
  if (color) {
    query_body.color = {
      hex: color,
      pixel_fraction: 0.15
    };
  }

  let [t, optional_terms, excluded_terms] = extractTags(q);
  if (optional_terms.length !== 0) query_body.optional_terms = optional_terms;
  if (excluded_terms.length !== 0) query_body.excluded_terms = excluded_terms;

  query_body.document_types = ['user', 'image', 'tag'];
  query_body.required_terms = t.split(' ');

  return query_body;
};

const initialState = loadSearch() || {
  current_query: ''
};

function requestQuery(query) {
  return {
    type: REQUEST_QUERY,
    query
  };
}

function setQuery(query) {
  return {
    type: SET_QUERY,
    query
  };
}

function recieveQuery(query, json) {
  return {
    type: RECEIVE_QUERY,
    query,
    results: json,
    receivedAt: Date.UTC(),
    isLoading: false
  };
}

function fetchQuery(query) {
  return dispatch => {
    dispatch(requestQuery(query));
    const body = parse(query);
    return Search(body).then(json => dispatch(recieveQuery(query, json.body)));
  };
}

function shouldFetchResults(state, query) {
  const result = state.search[query];
  if (!result) {
    return true;
  } else if (Date.UTC() - result.receivedAt > 432000) {
    return true;
  } else if (result.isLoading) {
    return false;
  }
}

function fetchResultsIfNeeded(query) {
  return (dispatch, getState) => {
    if (shouldFetchResults(getState(), query)) {
      return dispatch(fetchQuery(query));
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

function search(state = initialState, action) {
  switch (action.type) {
    case REQUEST_QUERY:
      return Object.assign({}, state, {
        [action.query]: {
          isLoading: true
        }
      });
    case RECEIVE_QUERY:
      return Object.assign({}, state, {
        [action.query]: {
          query: action.query,
          isLoading: false,
          results: action.results,
          receivedAt: action.receivedAt
        }
      });
    case SET_QUERY:
      return Object.assign({}, state, {
        current_query: action.query
      });
    default:
      return state;
  }
}

export {
  extractColor,
  extractTags,
  recieveQuery,
  requestQuery,
  setQuery,
  search,
  fetchResultsIfNeeded
};
