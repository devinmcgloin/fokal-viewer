import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Title = (name, username, description) => {
  const photoTitle = description || 'HD Photo';
  const photographerTitle = name ? name : username;
  return `${photoTitle} by ${photographerTitle}`;
};

const Description = (username, name, location) => {
  const user = name ? `${name} (${username})` : username;
  const locText = location.description ? `in ${location}` : '';
  return `Check out this photo ${locText} by ${user}`;
};

const Header = ({ image }) => {
  const photographer = image.user;
  const title = Title(photographer.name, photographer.username, image.description);
  console.log(title);
  return (
    <Helmet>
      <title>{{ title }}</title>
      <TwitterProperties {...photographer} {...image} location={image.metadata.location} />
    </Helmet>
  );
};

const TwitterProperties = ({ twitter, username, name, description, rawURL, location }) => {
  const twitterUsername = `@${twitter} `;
  const title = Title(name, username, description);
  const desc = Description(username, name, location);
  return (
    <React.Fragment>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={rawURL} />
    </React.Fragment>
  );
};

Header.propTypes = {
  photographer: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string.isRequired,
    location: PropTypes.string,
    twitter: PropTypes.string
  }),
  image: PropTypes.shape({
    src_links: PropTypes.shape({
      raw: PropTypes.string.isRequired
    })
  })
};

export { Header };
