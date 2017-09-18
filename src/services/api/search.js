import {endpoint, getHeaders, ParseResponse} from "./api";

const Search = (relurl, body) => {
    console.log(JSON.stringify(body));
    return fetch(endpoint + relurl, {
        headers: getHeaders('POST'),
        body: JSON.stringify(body),
        method: 'POST'
    })
        .then(ParseResponse)

};

export {Search}