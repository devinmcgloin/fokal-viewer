import {endpoint, getHeaders, ParseResponse} from "./api";

const FavoriteImage = (shortcode) =>
    fetch(endpoint + "/images/" + shortcode + "/favorite", {
        headers: getHeaders(),
        method: 'PUT',
    }).then(ParseResponse);

const FollowUser = (shortcode) =>
    fetch(endpoint + "/users/" + shortcode + "/follow", {
        headers: getHeaders(),
        method: 'PUT',
    }).then(ParseResponse);

export {FollowUser, FavoriteImage}