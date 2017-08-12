console.log(process.env.NODE_ENV);
const endpoint = process.env.NODE_ENV === "production" ? "https://api.sprioc.xyz/v0" : "http://localhost:8000/v0";

var headers = new Headers();

const setHeadersAuth = (jwt) => {
    headers.append("Authorization", "Bearer " + jwt)
};

const removeHeadersAuth = () => {
    headers.delete("Authorization")
};

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
        headers: headers})
        .then((resp) => resp.json())
        .then((resp) =>
            resp.map((img) => {
                img.permalink = FormatPermalink(img.permalink);
                img.user.permalink = FormatPermalink(img.user.permalink);
                return img;
            }))
};

const FetchMe = () => {
    return fetch(endpoint+"/me", {headers: headers})
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
    return FetchImages( "/u/" + username + "/images")
};


const UploadImage = (body) => {
    return fetch(endpoint+"/i", {
        headers: headers,
        method: 'POST',
        body: body
    })
        .then((resp) => resp.json());
};

const FormatPermalink = (url) => {
    let split = url.split("/");
    const rel = "/" + split[4] + "/" + split[5];
    return rel;
};

export {setHeadersAuth, removeHeadersAuth, FetchImage, FetchImages, FetchMe, FetchUser, UploadImage, FetchUserImages};