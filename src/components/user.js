import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {Collection} from "./collection";
import {Link} from 'react-router-dom'
import moment from 'moment';
import {Loading} from './loading'

const User = ({user, images, isGrid, isLoading, isSummary}) => {
    if (isLoading) {
        return <Loading/>
    }
    else {
        return (
            <main className="cf pa3 pa4-m pa5-l mw9 center">
                <div className="fr w-100 w-80-l">
                    <p className="sans-serif f6">
                        {user.bio}
                    </p>
                    <h1 className="sans-serif f2 f1-l lh-title mt0 mb4 mb5-ns">
                        {user.name}
                    </h1>
                </div>
                <div className="f6 lh-copy fl w-100 mb4">
                    <div className="fl-ns w-100 w-20-l pr3-m pr5-l">
                        <p>
                            <a className="sans-serif link dim gray" href={user.url}>
                                <FontAwesome name="link"/> Personal Site
                            </a>
                        </p>
                    </div>
                    <div className="fl-ns w-50-m w-20-l pr3-m pr5-l">
                        <p>
                            <Link className="sans-serif link dim gray" to={'/u/' + user.id + "/map"}>
                                <FontAwesome name="map-o"/> Images Geo
                            </Link>
                        </p>
                    </div>
                    <div className="fl-ns w-50-m w-20-l pr3-m pr5-l">
                        <p>
                            <Link className="sans-serif link dim gray" to={'/u/' + user.id + "/favorites"}>
                                <FontAwesome name="heart-o"/> Favorites
                            </Link>
                        </p>
                    </div>
                    <div className="fl-ns w-50-m w-20-l pr3-m pr5-l">
                        <p className="sans-serif">
                            Joined {moment(user.created_at).fromNow()}
                        </p>
                    </div>
                    <div className="fl-ns w-50-m w-20-l pr3-m pr5-l">
                        <p>
                            <Link className="sans-serif link dim gray" to={'/u/' + user.id + "/stats"}>
                                <FontAwesome name="line-chart"/> Stats
                            </Link>
                        </p>
                    </div>
                </div>
                <Collection images={images} isGrid={isGrid} isLoading={isLoading} summary={isSummary}/>
            </main>
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