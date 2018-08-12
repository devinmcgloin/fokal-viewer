import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tags = ({ tags }) => {
  const t = tags.map(t => (
    <Link key={t} to={'/t/' + t} className="link pointer dim br2 ba ph3 pv2 mb2 dib mr3 black">
      {'#' + t}
    </Link>
  ));

  return <div className="sans-serif center w-90 flex justify-center flex-wrap">{t}</div>;
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
};

export { Tags };
