import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

const UserTitleCard = ({usr}) =>
    <div className="sans-serif">
        <div className="br2 shadow-5"
             style={{background: '#3C3C3C'}}>
            <div className="flex justify-around">
                <div className="flex mv3">
                    <Link to={"/u/" + usr.id}>
                    <span className="br2 pa1 ba b--white-80 f5 fw2 white link dim no-underline pointer hover-white-80">
                        Images
                    </span>
                    </Link>
                </div>
                <div className="flex mv3">
                    <Link to={"/u/" + usr.id + "/favorites"}>
                    <span className="br2 pa1 ba b--white-80 f5 fw2 white link dim no-underline pointer hover-white-80">
                        Favorites
                    </span>
                    </Link>
                </div>
                <div className="flex mv3">
                    <Link to={"/u/" + usr.id + "/stats"}>
                    <span className="br2 pa1 ba b--white-80 f5 fw2 white link dim no-underline pointer hover-white-80">
                        Stats
                    </span>
                    </Link>
                </div>
            </div>
            <Link to={"/u/" + usr.id}>
                <img
                    src={usr.avatar_links.large}
                    alt=""
                    // className="mb7"
                    style={{borderRadius: '4px 4px 0 0'}}
                />
            </Link>
            <div className="fw1 pa3">
                <div>
                    <p className="f7 ttu tracked white-50">Name</p>
                    <span className="f5 fw2 white">{usr.name}</span>
                </div>

                <div>
                    <p className="f7 ttu tracked white-50">Location</p>
                    <span className="f5 fw2 white">{usr.location}</span>
                </div>
                <div>
                    <p className="f7 ttu tracked white-50">Bio</p>
                    <span className="f5 fw2 white">{usr.bio}</span>
                </div>
                <div>
                    <p className="f7 ttu tracked white-50">Portfolio</p>
                    <span className="f5 fw2 white"><a
                        className="link dim no-underline f5 fw2 white pointer hover-white-80"
                        href={usr.url}><FontAwesome name="link"/> {usr.url}</a></span>
                </div>
            </div>

        </div>
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