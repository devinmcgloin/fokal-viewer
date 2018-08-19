import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const auth = ({ isLoggedIn, Container, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn ? <Container {...props} /> : <Redirect to="/" />)}
  />
);

const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

const Authenticated = connect(mapStateToProps)(auth);

export default Authenticated;
