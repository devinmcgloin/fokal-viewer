import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

const UserTitleCard = ({ user }) => (
    <article className="center bg-white br2 pa3 pa4-ns ba b--black-10">
        <div className="tc">
            <img
                alt={`avatar-${user.id}`}
                src={user.avatar_links.thumb}
                className="br-100 h4 w4 dib"
            />
            <h1 className="f4">{user.name}</h1>
            <h1 className="f7 pb2">
                {user.location ? (
                    <span className={"ph2"}>
                        <FontAwesome name={"map-marker"} /> {user.location}
                    </span>
                ) : null}

                {user.url ? (
                    <span className={"ph2"}>
                        <a href={user.url} className={"link hover dim black"}>
                            <FontAwesome name={"globe"} /> Portfolio
                        </a>
                    </span>
                ) : null}
            </h1>
            <hr className="mw3 bb bw1 b--black-10" />
        </div>
        <p className="lh-copy measure tc center f6 black-70">{user.bio}</p>
    </article>
);

UserTitleCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        location: PropTypes.string,
        bio: PropTypes.string,
        url: PropTypes.string
    }).isRequired
};

const UserStatsCard = ({ title, value, background }) => (
    <div className="sans-serif">
        <div
            className="br2 shadow-5"
            style={{
                background: background
            }}
        >
            <div className="fw1 pa3">
                <div>
                    <p className="f7 ttu tracked white-50">{title}</p>
                    <span className="tc f2 fw2 white">{value}</span>
                </div>
            </div>
        </div>
    </div>
);

UserStatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
};

const UserCard = ({ user, images, horizontal }) => {
    let content;
    if (horizontal) {
        content = (
            <div className={"cf"}>
                <div className={"fl w-40 ph3"}>
                    <img
                        alt={`avatar-${user.id}`}
                        src={user.avatar_links.thumb}
                        className="br-100 h4 w4 ba b--black-05"
                        title=""
                    />
                </div>
                <div className={"fl w-60 ph3"}>
                    <h1 className="f3 mb2 black">{user.name}</h1>
                    <h2 className="f5 fw4 gray mt0 black">
                        {user.location || user.id}
                    </h2>
                </div>
            </div>
        );
    } else {
        content = (
            <div>
                <div className="tc">
                    <img
                        alt={`avatar-${user.id}`}
                        src={user.avatar_links.thumb}
                        className="br-100 h4 w4 dib ba b--black-05"
                        title=""
                    />
                    <h1 className="f3 mb2 black">{user.name}</h1>
                    <h2 className="f5 fw4 gray mt0 black">
                        {user.location || user.id}
                    </h2>
                </div>
                <div className="dib">
                    {images.slice(0, 3).map(i => (
                        <Link
                            className="fl w-33 pa1"
                            key={i.id}
                            to={"/i/" + i.id}
                        >
                            <img
                                alt={i.id}
                                src={i.src_links.thumb}
                                className="br2"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <article className="sans-serif bg-white br2 ba b--black-10 shadow-5">
            <div className={"center pa3 pa4-ns"}>
                <Link to={"/u/" + user.id} className={"link hover dim"}>
                    {content}
                </Link>
            </div>
        </article>
    );
};
UserCard.defaultProps = {
    images: [],
    horizontal: false
};

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        location: PropTypes.string,
        avatar_links: PropTypes.shape({ thumb: PropTypes.string.isRequired })
    }).isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            src_links: PropTypes.shape({ thumb: PropTypes.string.isRequired })
        })
    ),
    horizontal: PropTypes.bool
};

export { UserTitleCard, UserStatsCard, UserCard };
