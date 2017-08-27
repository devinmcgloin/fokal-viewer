import {GetJWT, LoggedIn} from "../store/auth";

const endpoint = process.env.NODE_ENV === "production" ? "https://api.fok.al/v0" : "http://localhost:8000/v0";

const getHeaders = () => {
    let headers = new Headers();
    if (LoggedIn()) {
        const jwt = GetJWT();
        headers.set("Authorization", "Bearer " + jwt);
        console.log(headers.get('Authorization'))
    }
    return headers
};

const FavoriteImage = (shortcode) =>
    fetch(endpoint + "/images/" + shortcode + "/favorite", {
        headers: getHeaders(),
        method: 'PUT',
    });

const FollowUser = (shortcode) =>
    fetch(endpoint + "/users/" + shortcode + "/follow", {
        headers: getHeaders(),
        method: 'PUT',
    });

const FetchImage = (shortcode) => {
    return fetch(endpoint + "/images/" + shortcode, {headers: getHeaders()})
        .then((resp) => resp.json())

};

const FetchImages = (relurl) => {
    return fetch(endpoint + relurl, {
        headers: getHeaders()
    })
        .then((resp) => resp.json())

};

const SearchImages = (relurl) => {
    return fetch(endpoint + relurl, {
        headers: getHeaders()
    })
        .then((resp) => resp.json())
        .then((data) => data.map((img) => img.image))

};

const FetchMe = () => {
    return fetch(endpoint + "/users/me", {headers: getHeaders()})
        .then((resp) => resp.json())
};

const FetchUser = (username) => {
    return fetch(endpoint + "/users/" + username, {headers: getHeaders()})
        .then((resp) => resp.json())
    // .then((data) => {
    //     data.permalink = FormatPermalink(data.permalink);
    //     data.user.permalink = FormatPermalink(data.user.permalink);
    //     return data
    // });
};

const FetchUserImages = (username) => {
    return FetchImages("/users/" + username + "/images")
};


const UploadImage = (body) => {
    return fetch(endpoint + "/images", {
        headers: getHeaders(),
        method: 'POST',
        body: body
    })
        .then((resp) => resp.json());
};

const Patch = (id, type, changes) => {
    console.log(id, type, changes);
    let jsonHeaders = getHeaders();
    jsonHeaders.append("Content-Type", "text/json");
    return fetch(endpoint + "/" + type + "/" + id, {
        headers: jsonHeaders,
        method: 'PATCH',
        body: JSON.stringify(changes)
    });
};

export {
    FetchImage,
    FetchImages,
    FetchMe,
    FetchUser,
    UploadImage,
    FetchUserImages,
    Patch,
    SearchImages,
    FollowUser,
    FavoriteImage
};
