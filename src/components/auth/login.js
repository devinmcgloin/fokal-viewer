import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import glogo from './g-normal.svg';
import Raven from 'raven-js';
import './join.css';

const LoginComponent = ({ isLoggedIn, onSuccess, title, redirect }) => {
  if (isLoggedIn) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="sans-serif mw6 pa5 ma4 tc center">
        <h1 className={'f1'}>{title}</h1>
        <p className={'measure f4 tc'}>
          Fokal does not save your password. We let Google manage passwords, resets and
          authentication.
        </p>

        <p className={'measure f4 tc'}>
          We have plans to add additional providers, if you have one in mind let us know.
        </p>

        <GoogleLogin
          clientId="927799575891-u91lp3oc5ceksbcrqnv6omvbml5cbe15.apps.googleusercontent.com"
          buttonText="Join with Google"
          onSuccess={onSuccess}
          onFailure={err => {
            Raven.captureException(err, {});
          }}
          className="dib sans-serif br2 shadow-5 f6 link dim ba ph5-ns ph3 pv3 dib dark-gray pointer inline-flex items-center bg-white"
          tag="span"
          type="none"
        >
          <img src={glogo} className="mh2 dib fl" alt="Google Logo" />
          {isLoggedIn ? (
            <span className={'dib'}>{title} in with Google</span>
          ) : (
            <span className={'dib'}>{title} with Google</span>
          )}
        </GoogleLogin>
      </div>
    );
  }
};

LoginComponent.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onSuccess: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  redirect: PropTypes.string.isRequired
};

export { LoginComponent };
