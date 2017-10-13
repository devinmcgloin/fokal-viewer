import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ name, username, location, avatarURL }) => (
    <Link to={"/u/" + username} className="no-underline">
        <article className="sans-serif dt w-100 pb2 mt2 link hover dim">
            <div className="dtc-ns w2 w3-ns v-mid dn">
                <img
                    src={avatarURL}
                    className="ba b--black-10 db br-100 w3-ns h2 h3-ns"
                />
            </div>
            <div className="dtc v-mid pl3">
                <h1 className="f6 f5-ns fw6 lh-title black mv0 link no-underline">
                    {name}
                </h1>
                <h2 className="f6 fw4 mt0 mb0 black-60 link no-underline">
                    @{username}
                </h2>
            </div>
        </article>
    </Link>
);

User.propTypes = {
    name: PropTypes.string,
    username: PropTypes.string.isRequired,
    location: PropTypes.string,
    avatarURL: PropTypes.string.isRequired
};

export { User };
