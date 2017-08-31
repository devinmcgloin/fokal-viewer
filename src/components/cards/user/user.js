import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

const UserTitleCard = ({usr}) =>
    <div className="pa4 ba" style={{background: "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) ), url("+usr.avatar_links.medium + ") center"}}>
        <h1 className="f4 f2-l fw7 mt0 pv3 bb near-white b--near-white ">@{usr.id}</h1>
        <span className="f6 fw7 lh-solid near-white dim">{usr.location}</span>
        <p className="lh-copy mt2 tc mt3-m mt5-l f6 near-white">
            <span className="fw9 f4 f1-l db lh-title mb3 mb4-l">{usr.bio}</span>

            <ul className="list pa1 tc">
                <li className="dib mr2">
                    <a href={usr.url} className="f7 f6-ns b db pa2 link dim moon-gray">
                        <FontAwesome name="link"/> Portfolio</a>
                </li>
                <li className="dib mr2">
                    <Link to={'/u/'+usr.id} className="f7 f6-ns b db pa2 link dim moon-gray">
                        <FontAwesome name="image"/> Images</Link>
                </li>
                <li className="dib mr2">
                    <Link to={'/u/'+usr.id + '/favorites'} className="f7 f6-ns b db pa2 link dim moon-gray">
                        <FontAwesome name="heart-o"/> Favorites</Link>
                </li>
                <li className="dib mr2">
                    <Link to={'/u/'+usr.id + + '/geo'} className="f7 f6-ns b db pa2 link dim moon-gray">
                        <FontAwesome name="map-o"/> Geo</Link>
                </li>
                <li className="dib mr2">
                    <Link to={'/u/'+usr.id + + '/stats'} className="f7 f6-ns b db pa2 link dim moon-gray">
                        <FontAwesome name="line-chart"/> Stats</Link>
                </li>
            </ul>
        </p>

    </div>;


UserTitleCard.propTypes = {
    usr: PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            location: PropTypes.string,
            bio: PropTypes.string,
            url: PropTypes.string,
        }
    ),
};


const UserStatsCard = ({title, number, background}) =>
        <div className="pa4 ba" style={{background: background}}>
            <h1 className="f4 f2-l fw7 mt0 pv3 bb near-white b--near-white ">{title}</h1>
            <p className="lh-copy mt2 tc mt3-m mt5-l f6 near-white">
                <div className="list pa1 tc">
                    <h2 className="v-mid">{number}</h2>
                </div>
            </p>
        </div>;


UserStatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired
};

export {UserTitleCard, UserStatsCard};