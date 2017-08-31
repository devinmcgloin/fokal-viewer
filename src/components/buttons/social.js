import React from 'react'
import {FavoriteImage, FollowUser} from "../../services/api/api"

const Favorite = ({id, isFavorited}) => {

};

const Follow = ({id, isFollowed}) =>
    isFollowed ? <button onClick={}>UnFollow</button> : <button onClick={() => FollowUser(id)}>Follow</button>
;

const Download = ({id}) => {

};