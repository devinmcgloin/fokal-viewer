import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({ title, stats }) => (
  <article className="sans-serif pa3 pa5-ns" data-name="slab-stat-large">
    <h3 className="f6 ttu tracked">{title}</h3>
    <div className="cf">
      {Object.entries(stats).map(([fst, snd, ...rest]) => (
        <dl key={fst} className="db dib-l w-auto-l lh-title mr6-l">
          <dd className="f6 fw4 ml0 ttc">{fst.split('_').join(' ')}</dd>
          <dd className="f2 f-subheadline-l fw6 ml0">{snd.toLocaleString()}</dd>
        </dl>
      ))}
    </div>
  </article>
);

Stats.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired
};

export { Stats };
