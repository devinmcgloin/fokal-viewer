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
        <HeaderSearchBox />
      </div>
      <HeaderMenuItems menuItems={this.menuItems()} />
    </nav>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool
};

Header.defaultProps = {
  isLoggedIn: false
};

class HeaderSearchBox extends Component {
  state = {
    q: '',
    submitted: false,
    submittedQuery: ''
  };
  onSubmit = e => {
    e.preventDefault();
    this.setState(prev => {
      return { submitted: true, submittedQuery: prev.q, q: '' };
    });
  };
  handleTextChange = e =>
    this.setState({
      q: e.target.value
    });
  render = () => {
    const redirect = this.state.submitted ? (
      <Redirect
        push
        to={{
          pathname: '/search',
          search: '?q=' + encodeURIComponent(this.state.submittedQuery)
        }}
      />
    ) : null;
    return (
      <React.Fragment>
        {redirect}
        <form onSubmit={this.onSubmit} className="db" style={{ flexGrow: 2 }}>
          <input
            type="text"
            id="query"
            name="query"
            onChange={this.handleTextChange}
            value={this.state.q}
            className="pa2 mr3 dib h2 bn input-reset br2 bg-near-white w-100"
          />
        </form>
      </React.Fragment>
    );
  };
}

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
