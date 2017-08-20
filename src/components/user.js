import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {GridCollection} from "./collection";
import {Link} from 'react-router-dom'
import moment from 'moment';

const UserHeader = ({user}) =>
    <main className="cf pa3 pa4-ns mw9 center">
        <div className="fl pa4 center ph5">
            <img src={user.avatar_links.medium} className="br1 ba b--black-10 h4 w4" alt="avatar"/>
        </div>
        <div className="fr w-100 w-80-l">
            <p className="sans-serif f6">
                {user.bio}
            </p>
            <h1 className="sans-serif f2 f1-l lh-title mt0">
                {user.name}
            </h1>
            <a href={user.url} className="sans-serif f6 link dim gray mb4 mb5-ns">
                <FontAwesome name="link"/> Personal Site
            </a>
        </div>
        <div className="f6 lh-copy fl w-100 mb4">
            <div className="fl-ns w-100 w-20-l pr3-m pr5-l">
                <p>
                    <Link className="sans-serif link dim gray" to={'/u/' + user.id}>
                        <FontAwesome name="image"/> Images
                    </Link>
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
    </main>;


UserHeader.propTypes = {
    user: PropTypes.shape(
        {
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            url: PropTypes.string,
        }
    ),
};


const UserStats = ({user, images}) => {
    let init = {views: 0, favorites: 0, downloads: 0};
    const s = images.reduce((acc, cur) => ({
        views: acc.views + cur.stats.views,
        downloads: acc.downloads + cur.stats.downloads,
        favorites: acc.favorites + cur.stats.favorites,
    }), init);
    return (
        <article className="pa3 pa5-ns sans-serif" data-name="slab-stat-large">
            <h3 className="f6 ttu tracked">Image Stats</h3>
            <div className="cf">
                <dl className="db dib-l w-auto-l lh-title mr6-l">
                    <dd className="f6 fw4 ml0">Images</dd>
                    <dd className="f2 f-subheadline-l fw6 ml0">{images.length}</dd>
                </dl>
                {/*<dl className="db dib-l w-auto-l lh-title mr6-l">*/}
                {/*<dd className="f6 fw4 ml0">Followers</dd>*/}
                {/*<dd className="f2 f-subheadline-l fw6 ml0">{user.folowers.length}</dd>*/}
                {/*</dl>*/}
                <dl className="db dib-l w-auto-l lh-title mr6-l">
                    <dd className="f6 fw4 ml0">Views</dd>
                    <dd className="f2 f-subheadline-l fw6 ml0">{s.views.toLocaleString()}</dd>
                </dl>
                <dl className="db dib-l w-auto-l lh-title mr6-l">
                    <dd className="f6 fw4 ml0">Favorites</dd>
                    <dd className="f2 f-subheadline-l fw6 ml0">{s.favorites.toLocaleString()}</dd>
                </dl>
                <dl className="db dib-l w-auto-l lh-title">
                    <dd className="f6 fw4 ml0">Downloads</dd>
                    <dd className="f2 f-subheadline-l fw6 ml0">{s.downloads.toLocaleString()}</dd>
                </dl>
            </div>
        </article>
    )

};

UserStats.propTypes = {
    user: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.object)
};

export {UserHeader, UserStats};