import React from 'react';
import { MapPointView } from '../map';
import PropTypes from 'prop-types';

const MapCard = ({ lat, lng, description }) => (
  <article className="sans-serif bg-white br2 ba b--black-10 shadow-5">
    <div className={'pa3 pa4-ns cf'}>
      <div className={'w-60 fl br b--black-10 dib pr3 h5'}>
        <MapPointView lng={lng} lat={lat} />
      </div>
      <div className={'w-40 fl dib pa3 dt h5'}>
        <span className={'dtc tc f3 fw4 v-mid dib'}>{description}</span>
      </div>
    </div>
  </article>
);

MapCard.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  description: PropTypes.string,
};

MapCard.defaultProps = {
  description: '--',
};

export { MapCard };
