import React from 'react';
import PropTypes from 'prop-types';

const MetadataCard = ({
  iso,
  aperture,
  exposure_time,
  focal_length,
  make,
  model,
  lens_make,
  lens_model,
}) => (
  <article className="sans-serif bg-white br2 ba b--black-10 shadow-5">
    <div className={'pa3 pa4-ns mv3 cf'}>
      <div className={'fl w-50 tc pa2 fw3 f3'}>
        ISO <span className={'b'}>{iso ? iso : '--'}</span>
      </div>
      <div className={'fl w-50 tc pa2 fw3 f3'}>
        f/<span className={'b'}>{aperture ? aperture : '--'}</span>
      </div>
      <div className={'fl w-50 tc pa2 fw3 f3'}>
        <span className={'b'}>{exposure_time ? exposure_time : '--'}</span>s
      </div>
      <div className={'fl w-50 tc pa2 fw3 f3'}>
        <span className={'b'}>{focal_length ? focal_length : '--'}</span>mm
      </div>
      {/*<div className={'fl w-50 tc pa2 fw3 f3'}>{make + ' ' + model}</div>*/}
      {/*<div className={'fl w-50 tc pa2 fw3 f3'}>{lens_make + ' ' + lens_model}</div>*/}
    </div>
  </article>
);

MetadataCard.propTypes = {
  iso: PropTypes.number,
  aperture: PropTypes.number,
  exposure_time: PropTypes.number,
  focal_length: PropTypes.number,
  make: PropTypes.string,
  model: PropTypes.string,
  lens_make: PropTypes.string,
  lens_model: PropTypes.string,
};

MetadataCard.defaultProps = {
  iso: null,
  aperture: null,
  exposure_time: null,
  focal_length: null,
};

export { MetadataCard };
