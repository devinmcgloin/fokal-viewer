import React from 'react';
import PropTypes from 'prop-types';

const MetadataViewer = (props) => {
    const ulStyle = {
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem 1rem 1rem',
        width: '90%'
    };

    const liStye = {
        display: 'block',
        padding: '0 1rem 1rem 1rem',
        fontFamily: ['Montserrat', 'sans-serif']
    };
    return (
        <ul style={ulStyle}>
            <li style={liStye}>Aperture <strong>{props.aperture}</strong></li>
            <li style={liStye}>ISO <strong>{props.iso}</strong></li>
            <li style={liStye}>Exposure Time <strong>{props.exposure_time}s</strong></li>
            <li style={liStye}>Focal Length <strong>{props.focal_length}mm</strong></li>
        </ul>)
};

MetadataViewer.propTypes = {
    aperture: PropTypes.string,
    iso: PropTypes.number,
    exposure_time: PropTypes.string,
    focal_length: PropTypes.string,
};

export {MetadataViewer};
