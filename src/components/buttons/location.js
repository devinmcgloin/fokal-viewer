import React from 'react';
import FontAwesome from 'react-fontawesome';

const LocationButton = ({ handleClick }) => (
    <span onClick={handleClick} className="link pointer br2 ba ph3 pv2 dib black-50">
        <span className="flex justify-between">
            <FontAwesome className="flex" name="map-marker" />
            <span className="sans-serif pl3 f6">Location</span>
        </span>
    </span>
);

export default LocationButton;
