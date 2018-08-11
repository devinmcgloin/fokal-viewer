import { endpoint, getHeaders } from './api';

const DeleteImage = id => {
    let jsonHeaders = getHeaders();
    return fetch(endpoint + '/images/' + id, {
        headers: jsonHeaders,
        method: 'DELETE'
    });
};

export { DeleteImage };
