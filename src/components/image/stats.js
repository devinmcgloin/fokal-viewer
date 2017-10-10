import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";

const Stats = ({ favorites, downloads, views }) => (
    <div className="dt dt--fixed w-60-l w-80 center sans-serif">
        <div className="dtc tc pv4 ">
            <span className="gray">
                <FontAwesome name="heart" />
                <span className="pl2">Favorites</span>
            </span>
            <h3 className="f3">{favorites}</h3>
        </div>
        <div className="dtc tc pv4">
            <span className="gray">
                <FontAwesome name="download" />
                <span className="pl2">Downloads</span>
            </span>

            <h3 className="f3">{downloads}</h3>
        </div>
        <div className="dtc tc pv4">
            <span className="gray">
                <FontAwesome name="eye" />
                <span className="pl2">Views</span>
            </span>

            <h3 className="f3">{views}</h3>
        </div>
    </div>
);

Stats.propTypes = {
    favorites: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired
};

export { Stats };
