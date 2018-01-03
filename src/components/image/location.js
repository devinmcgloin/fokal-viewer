import React from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Location = ({ description, point }) => {
    const content = (
        <span className="flex justify-between">
            <FontAwesome className="flex" name="map-marker" />
            <span className="sans-serif pl3 f6">
                {description ||
                    point.lat.toFixed(3) + ", " + point.lng.toFixed(3)}
            </span>
        </span>
    );

    return description ? (
        <Link
            to={"/search/images?q=" + encodeURIComponent(description)}
            className="link pointer dim br2 ba ph3 pv2 mb2 dib black"
        >
            {content}
        </Link>
    ) : (
        <span className="br2 ba ph3 pv2 mb2 dib black">{content}</span>
    );
};

Location.propTypes = {
    description: PropTypes.string,
    point: PropTypes.object
};

export { Location };
