import {GetJWT, LoggedIn} from "../store/auth";

const endpoint = process.env.NODE_ENV === "production" ? "https://api.sprioc.xyz/v0" : "http://localhost:8000/v0";

var headers = new Headers();

const setHeadersAuth = () => {
    if (LoggedIn()){
        const jwt = GetJWT();
        // headers.removeItem("Authorization");
        headers.set("Authorization", "Bearer " + jwt)
    } else {
        headers.removeItem("Authorization");
    }
};

const FavoriteImage = (shortcode) =>
    fetch(endpoint+"/i/"+shortcode+"/favorite", {
        headers: headers,
        method: 'PUT',
    });

const FollowUser = (shortcode) =>
    fetch(endpoint+"/u/"+shortcode+"/follow", {
        headers: headers,
        method: 'PUT',
    });

const FetchImage = (shortcode) => {
    return fetch(endpoint + "/i/" + shortcode)
        .then((resp) => resp.json())
        .then((data) => {
            data.permalink = FormatPermalink(data.permalink);
            data.user.permalink = FormatPermalink(data.user.permalink);
            return data
        });
};

const FetchImages = (relurl) => {
    return fetch(endpoint + relurl, {
        headers: headers
    })
        .then((resp) => resp.json())
        .then((resp) =>
            resp.map((img) => {
                img.permalink = FormatPermalink(img.permalink);
                img.user.permalink = FormatPermalink(img.user.permalink);
                return img;
            }))
};

const SearchImages = (relurl) => {
    return fetch(endpoint + relurl, {
        headers: headers
    })
        .then((resp) => resp.json())
        .then((data) => data.map((img) => img.Image))
        .then((resp) =>
            resp.map((img) => {
                img.permalink = FormatPermalink(img.permalink);
                img.user.permalink = FormatPermalink(img.user.permalink);
                return img;
            }))
};

const FetchMe = () => {
    return fetch(endpoint + "/u/me", {headers: headers})
        .then((resp) => resp.json())
};

const FetchUser = (username) => {
    return fetch(endpoint + "/u/" + username)
        .then((resp) => resp.json())
    // .then((data) => {
    //     data.permalink = FormatPermalink(data.permalink);
    //     data.user.permalink = FormatPermalink(data.user.permalink);
    //     return data
    // });
};

const FetchUserImages = (username) => {
    return FetchImages("/u/" + username + "/images")
};


const UploadImage = (body) => {
    return fetch(endpoint + "/i", {
        headers: headers,
        method: 'POST',
        body: body
    })
        .then((resp) => resp.json());
};

const Patch = (id, type, changes) => {
    console.log(id, type, changes);
    headers.append("Content-Type", "text/json");
    let promise = fetch(endpoint + "/" + type + "/" + id, {
        headers: headers,
        method: 'PATCH',
        body: JSON.stringify(changes)
    });
    headers.delete("Content-Type");
    return promise
};

const FormatPermalink = (url) => {
    let split = url.split("/");
    return "/" + split[4] + "/" + split[5];
};

export {
    setHeadersAuth,
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