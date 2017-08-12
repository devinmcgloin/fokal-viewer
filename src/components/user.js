import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {Collection} from "./collection";

const User = ({user, images, isGrid, isLoading, isSummary}) => {
    return (
        <div className="container is-full-hd">
            <h1 className="title">{user.name}</h1>
            <h2 className="subtitle">{user.bio}</h2>
            <FontAwesome name="external-link">
                <a href={user.url}/>
            </FontAwesome>
            <Collection isGrid={isGrid} isLoading={isLoading} summary={isSummary} images={images}/>
        </div>
    )
};

User.propTypes = {
    user: PropTypes.shape(
        {
            name: PropTypes.string,
            bio: PropTypes.string,
            url: PropTypes.string,
        }
    ),
    images: PropTypes.object,
    isGrid: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSummary: PropTypes.bool,

};

export {User};