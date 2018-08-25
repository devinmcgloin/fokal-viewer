import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TagCard = ({ image, count, id }) => (
  <div className={'sans-serif'}>
    <Link to={'/t/' + id.split(' ').join('-')} className="link hover dim">
      <div className={''}>
        <div
          alt=""
          className="db bg-center cover br2"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0) 70%), url(' +
              image.src_links.raw +
              '?auto=format&dpr=1&q=0.6&crop=faces&fit=crop&w=0.3&h=0.3' +
              ')'
          }}
        >
          <div className="fw1 pv3 ph4">
            <div>
              <p className="link no-underline f6 fw2 white-80 ma0">
                {count} {count === 1 ? 'Image' : 'Images'}
              </p>
              <p className="link no-underline f2 fw4 white ma0">{id}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

TagCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.shape({ src_links: PropTypes.object.isRequired }),
  count: PropTypes.number.isRequired
};

export { TagCard };
