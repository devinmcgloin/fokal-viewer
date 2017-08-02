import React from 'react';
import PropTypes from 'prop-types';

const MetadataViewer = (props) => {
    const ulStyle = {
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem 0 1rem',
        width: '90%',
        margin:'auto'
    };

    const liStye = {
        display: 'block',
        padding: '.5rem 1rem .5rem 1rem',
        fontFamily: ['Montserrat', 'sans-serif']
    };
    return (
        <ul style={ulStyle}>
            <li style={liStye}>ƒ/<strong>{props.aperture}</strong></li>
            <li style={liStye}>ISO <strong>{props.iso}</strong></li>
            <li style={liStye}><strong>{props.exposure_time}</strong>s</li>
            <li style={liStye}><strong>{props.focal_length}</strong>mm</li>
        </ul>)
};

MetadataViewer.propTypes = {
    aperture: PropTypes.string,
    iso: PropTypes.number,
    exposure_time: PropTypes.string,
    focal_length: PropTypes.string,
};

export {MetadataViewer};
