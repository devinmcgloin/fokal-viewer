import {endpoint, getHeaders, ParseResponse} from "./api";

const Patch = (id, type, changes) => {
    console.log(id, type, changes);
    let jsonHeaders = getHeaders();
    jsonHeaders.append("Content-Type", "text/json");
    return fetch(endpoint + "/" + type + "/" + id, {
        headers: jsonHeaders,
        method: 'PATCH',
        body: JSON.stringify(changes)
    }).then(ParseResponse)
};

export {Patch};