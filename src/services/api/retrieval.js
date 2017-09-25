import { endpoint, getHeaders, ParseResponse } from "./api";

const FetchImage = shortcode => {
    return fetch(endpoint + "/images/" + shortcode, {
        headers: getHeaders()
    }).then(ParseResponse);
};

const FetchImages = relurl => {
    return fetch(endpoint + relurl, {
        headers: getHeaders()
    }).then(ParseResponse);
};

const FetchMe = () => {
    return fetch(endpoint + "/users/me", { headers: getHeaders() }).then(
        ParseResponse
    );
};

const FetchUser = username => {
    return fetch(endpoint + "/users/" + username, {
        headers: getHeaders()
    }).then(ParseResponse);
};

const FetchUserImages = username => {
    return FetchImages("/users/" + username + "/images");
};

const IncrementDownloads = id =>
    fetch(endpoint + "/images/" + id + "/download", {
        method: "PUT",
        headers: getHeaders()
    });

export {
    FetchImages,
    FetchImage,
    FetchMe,
    FetchUser,
    FetchUserImages,
    IncrementDownloads
};
