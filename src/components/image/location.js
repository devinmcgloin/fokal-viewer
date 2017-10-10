import React from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Location = ({ description, point }) => (
    <Link
        to={"/search/images?q=" + encodeURIComponent(description)}
        className="link pointer dim br2 ba ph3 pv2 mb2 dib black"
    >
        <span className="flex justify-between">
            <FontAwesome className="flex" name="map-marker" />
            <span className="pl3 f6">
                {description ||
                    point.lat.toFixed(3) + ", " + point.lng.toFixed(3)}
            </span>
        </span>
    </Link>
);

Location.propTypes = {
    description: PropTypes.string,
    point: PropTypes.object
};

export { Location };
