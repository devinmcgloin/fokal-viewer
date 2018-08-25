import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/logo.svg';

class Header extends Component {
  state = {
    menuItems: [{ link: '/explore', title: 'Explore' }, { link: '/featured', title: 'Featured' }],
    loggedOutItems: [
      { link: '/login', title: 'Login' },
      { link: '/join', title: 'Join', button: { featured: true } }
    ],
    loggedInItems: [
      { link: '/account/settings', title: 'Settings' },
      { link: '/logout', title: 'Logout' },
      { link: '/submit', title: 'Submit', button: { featured: true } }
    ]
  };

  menuItems = () => {
    const { menuItems, loggedOutItems, loggedInItems } = this.state;
    return this.props.isLoggedIn
      ? menuItems.concat(loggedInItems)
      : menuItems.concat(loggedOutItems);
  };

  render = () => (
    <nav className="sans-serif bg-white">
      <div className="pa2 pa3-ns bb b--black-10 black-70 flex items-center justify-between">
        <Link className="link dib mr3 tc" to="/" title="Home">
          <img src={logo} style={{ width: '3rem', height: '3rem' }} alt="fokal logo" />
        </Link>
        <HeaderSearchBox
          query={this.props.query}
          setQuery={this.props.setQuery}
          fetchResults={this.props.fetchResults}
        />
      </div>
      <HeaderMenuItems menuItems={this.menuItems()} />
    </nav>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  setQuery: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
  query: PropTypes.string
};

Header.defaultProps = {
  isLoggedIn: false
};

class HeaderSearchBox extends Component {
  render = () => {
    const redirect = this.props.query !== '' && (
      <Redirect
        push
        to={{
          pathname: `/search/${this.props.query.split(' ').join('-')}`
        }}
      />
    );
    return (
      <React.Fragment>
        {redirect}
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.fetchResults(this.props.query);
          }}
          className="db"
          style={{ flexGrow: 2 }}
        >
          <input
            type="text"
            id="query"
            name="query"
            onChange={e => {
              e.preventDefault();
              this.props.setQuery(e.target.value);
            }}
            value={this.props.query}
            className="pa2 mr3 dib h2 bn input-reset br2 bg-near-white w-100"
          />
        </form>
      </React.Fragment>
    );
  };
}

HeaderSearchBox.propTypes = {
  query: PropTypes.string,
  fetchResults: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired
};

const HeaderMenuItems = ({ menuItems }) => {
  const nodes = menuItems.map(item => {
    return item.button ? (
      <HeaderMenuButton
        title={item.title}
        link={item.link}
        featured={item.button.featured || false}
        key={item.link}
      />
    ) : (
      <HeaderMenuLink link={item.link} key={item.link}>
        {item.title}
      </HeaderMenuLink>
    );
  });
  return <header className="pa2 pa3-ns bb b--black-10 flex items-center">{nodes}</header>;
};

HeaderMenuItems.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      button: PropTypes.shape({
        featured: PropTypes.bool
      })
    })
  )
};

HeaderMenuItems.defaultProps = {
  menuItems: []
};

const HeaderMenuButton = ({ link, featured, title }) => {
  const buttonStyle = featured ? 'bg-green hover-bg-dark-green white' : 'ba b--black-50 black-50';
  return (
    <HeaderMenuLink link={link}>
      <button className={`pointer no-underline f6 tc db bn w3 h2 bg-animate ${buttonStyle} br2`}>
        {title}
      </button>
    </HeaderMenuLink>
  );
};

const HeaderMenuLink = ({ link, children }) => (
  <Link className="f6 fw6 b dib mr3 link hover-blue black-70 ttc" to={link}>
    {children}
  </Link>
);
export { Header };
