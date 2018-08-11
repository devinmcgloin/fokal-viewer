import { endpoint, getHeaders, ParseResponse } from './api';

const UploadImage = body =>
    fetch(endpoint + '/images', {
        headers: getHeaders(),
        method: 'POST',
        body: body
    }).then(ParseResponse);

const UploadAvatar = body =>
    fetch(endpoint + '/users/me/avatar', {
        headers: getHeaders(),
        method: 'PUT',
        body: body
    }).then(ParseResponse);

export { UploadImage, UploadAvatar };
