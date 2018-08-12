import { Logout } from '../../services/store/auth';
import { Redirect } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const LogoutPage = ({ onSuccess }) => {
  Logout();
  onSuccess();
  return <Redirect to="/" />;
};

LogoutPage.propTypes = {
  onSuccess: PropTypes.func.isRequired
};

export { LogoutPage };
