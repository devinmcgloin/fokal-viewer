import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Colors = ({ colors }) => {
  const c = colors.map(clr => (
    <Link
      key={clr.hex}
      to={'/search?q=' + encodeURIComponent(clr.hex)}
      className="link pointer dim br2 ba ma2 dib black"
      style={{ width: '6.5rem' }}
    >
      <span style={{ background: clr.hex }} className="fl w-100 h2 br2 br--top" />
      <span className="fl w-100 ph3 pv2 ">{clr.hex}</span>
    </Link>
  ));

  return <div className="sans-serif center flex justify-center flex-wrap">{c}</div>;
};

Colors.propTypes = {
  colors: PropTypes.array.isRequired
};

export { Colors };
