import { endpoint, ParseResponse } from "./api";
import Raven from "raven-js";

const RefreshToken = token => {
    let headers = new Headers();
    headers.append("Authorization", "Bearer " + token);

    return fetch(endpoint + "/auth/refresh", {
        headers: headers
    })
        .then(ParseResponse)
        .catch(err => Raven.captureException(err));
};
export { RefreshToken };
