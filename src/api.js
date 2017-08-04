
console.log(process.env.NODE_ENV)
const endpoint = process.env.NODE_ENV === "production" ? "https://api.sprioc.xyz/v0" : "http://localhost:8000/v0";

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
    return fetch(endpoint + relurl)
        .then((resp) => resp.json())
        .then((data) => {
            data.map((img) => {
                data.permalink = FormatPermalink(data.permalink);
                data.user.permalink = FormatPermalink(data.user.permalink);
                return data
            })
        })
};


const FormatPermalink = (url) => {
    let split = url.split("/");
    const rel = split[4] + "/" + split[5];
    return process.env.NODE_ENV === "production" ? "https://dev.sprioc.xyz/" + rel : "http://localhost:3000/" + rel;
};

export {FetchImage, FetchImages};