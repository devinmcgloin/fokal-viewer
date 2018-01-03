import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Metadata = ({
    iso,
    exposure_time,
    aperture,
    focal_length,
    capture_time,
    make,
    model,
    lens_make,
    lens_model
}) => (
    <article className="cf sans-serif center w-80">
        <div className="fl w-100 w-33-ns pa3 tc">
            <dd className="f6 fw4 ml0">Aperture</dd>
            <dd className="f3 fw6 ml0">
                {aperture ? "f/" + Math.round(aperture * 100) / 100 : "--"}
            </dd>
        </div>
        <div className="fl w-100 w-33-ns pa3 tc">
            <dd className="f6 fw4 ml0">Expsure Time</dd>
            <dd className="f3 fw6 ml0">
                {exposure_time ? exposure_time + "s" : "--"}
            </dd>
        </div>
        <div className="fl w-100 w-33-ns pa3 tc">
            <dd className="f6 fw4 ml0">Focal Length</dd>
            <dd className="f3 fw6 ml0">
                {focal_length ? focal_length + "mm" : "--"}
            </dd>
        </div>
        <div className="fl w-100 w-33-ns pa3 tc">
            <dd className="f6 fw4 ml0">ISO</dd>
            <dd className="f3 fw6 ml0">{iso ? iso : "--"}</dd>
        </div>
        <div className="fl w-100 w-33-ns pa3 tc">
            <dd className="f6 fw4 ml0">Capture Time</dd>
            <dd className="f3 fw6 ml0">
                {capture_time ? moment(capture_time).format("LL") : "--"}
            </dd>
        </div>
        <div className="fl w-100 w-33-ns pa3 tc">
            <dd className="f6 fw4 ml0">Camera</dd>
            <dd className="f3 fw6 ml0">
                {!make && !model ? "--" : [make, model].join(" ")}
            </dd>
        </div>
    </article>
);

Metadata.propTypes = {
    iso: PropTypes.number,
    focal_length: PropTypes.number,
    exposure_time: PropTypes.string,
    aperture: PropTypes.number,
    capture_time: PropTypes.string,
    make: PropTypes.string,
    model: PropTypes.string,
    lens_make: PropTypes.string,
    lens_model: PropTypes.string
};

export { Metadata };
