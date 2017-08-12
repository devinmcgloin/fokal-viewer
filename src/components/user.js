import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {Collection} from "./collection";
import ReactLoading from 'react-loading'

const User = ({user, images, isGrid, isLoading, isSummary}) => {
    if (isLoading){
        return <ReactLoading/>
    }
    else {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>{user.bio}</h2>
                <FontAwesome name="external-link">
                    <a href={user.url}/>
                </FontAwesome>
                <Collection isGrid={isGrid} isLoading={isLoading} summary={isSummary} images={images}/>
            </div>
        )
    }
};

User.propTypes = {
    user: PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            url: PropTypes.string,
        }
    ),
    isGrid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSummary: PropTypes.bool.isRequired,
    images: PropTypes.array,

};

export {User};