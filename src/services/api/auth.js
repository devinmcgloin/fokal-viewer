import { endpoint, ParseResponse } from './api';

const CreateUser = token => {
  let headers = new Headers();
  headers.append('Authorization', 'Bearer ' + token);

  return fetch(endpoint + '/users', {
    method: 'POST',
    headers: headers,
  }).then(ParseResponse);
};

const RefreshToken = token => {
  let headers = new Headers();
  headers.append('Authorization', 'Bearer ' + token);

  return fetch(endpoint + '/auth/refresh', {
    headers: headers,
  }).then(ParseResponse);
};
export { RefreshToken, CreateUser };
