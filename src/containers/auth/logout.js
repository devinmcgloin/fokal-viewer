import React from 'react';
import { Redirect } from 'react-router-dom';
import { Logout } from '../../store/action-creators';
import { connect } from 'react-redux';

const LogoutComponent = ({ onLogout }) => {
  onLogout();
  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(Logout())
  };
};

const LogoutContainer = connect(
  () => {},
  mapDispatchToProps
)(LogoutComponent);

export { LogoutContainer };
