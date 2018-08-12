import { endpoint, getHeaders, ParseResponse } from './api';

const FavoriteImage = (shortcode, method) =>
  fetch(endpoint + '/images/' + shortcode + '/favorite', {
    headers: getHeaders(),
    method: method
  });

const FollowUser = shortcode =>
  fetch(endpoint + '/users/' + shortcode + '/follow', {
    headers: getHeaders(),
    method: 'PUT'
  }).then(ParseResponse);

export { FollowUser, FavoriteImage };
