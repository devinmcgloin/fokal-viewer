import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import {Link} from 'react-router-dom'

const MetadataViewer = ({user, metadata, stats}) => {
    return (
        <article className="sans-serif pa3 pa5-ns" data-name="slab-stat-small">
            <h3 className="f6 ttu tracked">Metadata</h3>
            <div className="cf">
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Aperture</dd>
                    <dd className="f3 fw6 ml0">{metadata.aperture}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">ISO</dd>
                    <dd className="f3 fw6 ml0">{metadata.iso}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Exposure Time</dd>
                    <dd className="f3 fw6 ml0">{metadata.exposure_time}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Focal Length</dd>
                    <dd className="f3 fw6 ml0">{metadata.focal_length}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Views</dd>
                    <dd className="f3 fw6 ml0">{stats.views}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Downloads</dd>
                    <dd className="f3 fw6 ml0">{stats.downloads}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Favorites</dd>
                    <dd className="f3 fw6 ml0">{stats.favorites}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Capture Time</dd>
                    <dd className="f3 fw6 ml0">{moment(metadata.capture_time).format("MMM Do YYYY")}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Camera</dd>
                    <dd className="f3 fw6 ml0">{metadata.make + " " + metadata.model}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
                    <dd className="f6 fw4 ml0">Lens</dd>
                    <dd className="f3 fw6 ml0">{metadata.lens_model}</dd>
                </dl>
                <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
                    <dd className="f6 fw4 ml0">Photographer</dd>
                    <dd className="f3 fw6 ml0"><Link className="link dim gray" to={user.permalink}>{user.name}</Link></dd>
                </dl>
            </div>
        </article>
    )
};

MetadataViewer.propTypes = {
    metadata : PropTypes.shape({
        aperture: PropTypes.string,
        iso: PropTypes.number,
        exposure_time: PropTypes.string,
        focal_length: PropTypes.string,
        capture_time: PropTypes.string,
        make: PropTypes.string,
        model: PropTypes.string,
        lens_model: PropTypes.string
    }),
    stats : PropTypes.shape({
        downloads: PropTypes.int,
        favorites: PropTypes.int,
        views: PropTypes.int,
    }),
    user: PropTypes.shape({
        name: PropTypes.string,
        permalink: PropTypes.string,
    })
};

export {MetadataViewer};
