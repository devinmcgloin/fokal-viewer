import { endpoint, getHeaders, ParseResponse } from './api';

const Search = body => {
  return fetch(endpoint + '/search', {
    headers: getHeaders('POST'),
    body: JSON.stringify(body),
    method: 'POST'
  }).then(ParseResponse);
};

export { Search };
