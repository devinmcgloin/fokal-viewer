const endpoint = process.env.NODE_ENV === "production" ? "https://api.sprioc.xyz/v0" : "http://localhost:8000/v0";

const LoadImage = (shortcode) => {
    let t = this;
    fetch(endpoint + "/i/" + shortcode)
        .then((resp) => resp.json())
        .then(function (data) {
            t.resp = data;
            t.resp.permalink = FormatPermalink(t.resp.permalink);
            t.resp.user.permalink = FormatPermalink(t.resp.user.permalink);
            console.log(t.resp)
        }).catch((err) => console.log(err));
    return t.resp
};


const FormatPermalink = (url) => {
    let split = url.split("/");
    const rel = split[4] + "/" + split[5];
    return process.env.NODE_ENV === "production" ? "https://dev.sprioc.xyz/" + rel : "http://localhost:3000/" + rel;
};

export {LoadImage};