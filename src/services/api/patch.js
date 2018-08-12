import { endpoint, getHeaders } from './api';

const Patch = (id, type, changes) => {
  let jsonHeaders = getHeaders();
  jsonHeaders.append('Content-Type', 'text/json');
  return fetch(endpoint + '/' + type + '/' + id, {
    headers: jsonHeaders,
    method: 'PATCH',
    body: JSON.stringify(changes)
  });
};

export { Patch };
