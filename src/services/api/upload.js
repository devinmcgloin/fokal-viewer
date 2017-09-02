import {endpoint, getHeaders, ParseResponse} from "./api";

const UploadImage = (body) => {
    return fetch(endpoint + "/images", {
        headers: getHeaders(),
        method: 'POST',
        body: body
    })
        .then(ParseResponse);
};

export {UploadImage}