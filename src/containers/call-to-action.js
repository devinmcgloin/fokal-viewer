import React from 'react';
import { connect } from 'react-redux';
import CallToAction from '../components/call-to-action';
import { Route } from 'react-router-dom';

const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn };
};

const CallToActionContainer = ({ isLoggedIn, Container, title, message, call, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <React.Fragment>
          {isLoggedIn || <CallToAction title={title} message={message} call={call} />}
          <Container {...props} />
        </React.Fragment>
      );
    }}
  />
);

const CTARoute = connect(mapStateToProps)(CallToActionContainer);

export default CTARoute;
