/* global process */

import {GetJWT, LoggedIn} from "../store/auth";


const endpoint = process.env.NODE_ENV === "production" ? "https://api.fok.al/v0" : "http://localhost:8000/v0";

const getHeaders = (method) => {
    let headers = new Headers();
    if (LoggedIn()) {
        const jwt = GetJWT();
        headers.append("Authorization", "Bearer " + jwt);
        if (method === 'POST')
            headers.append("Content-Type", 'application/json')
    }
    return headers
};

const ParseResponse = (resp) => {
    return {ok: resp.ok, status: resp.status, body: resp.json()}
};

export {
    endpoint,
    getHeaders,
    ParseResponse
};
