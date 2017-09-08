import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

const UserTitleCard = ({usr}) =>
    <div className="sans-serif">
        <div className="br2 shadow-5"
             style={{background: '#3C3C3C'}}>
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


const UserStatsCard = ({title, value, background}) =>
    <div className="sans-serif">
        <div className="br2 shadow-5"
             style={{background: background}}>
            <div className="fw1 pa3">
                <div>
                    <p className="f7 ttu tracked white-50">{title}</p>
                    <span className="tc f2 fw2 white">{value}</span>
                </div>
            </div>

        </div>
    </div>;


UserStatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
};

export {UserTitleCard, UserStatsCard};