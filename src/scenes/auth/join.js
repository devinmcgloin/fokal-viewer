import React from "react";

import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import "./join.css";
import { Redirect } from "react-router-dom";
import glogo from "./g-normal.svg";
import Raven from "raven-js";

const Join = props => {
    if (props.isLoggedIn) {
        return <Redirect to="/why" />;
    } else {
        return (
            <div className="sans-serif mw6 pa5 ma4 tc center">
                <h1 className={"f1"}>Join</h1>
                <p className={"measure f4 tc"}>
                    Fokal does not save your password. We let Google manage
                    passwords, resets and authentication.
                </p>

                <p className={"measure f4 tc"}>
                    We have plans to add additional providers, if you have one
                    in mind let us know.
                </p>

                <GoogleLogin
                    clientId="927799575891-u91lp3oc5ceksbcrqnv6omvbml5cbe15.apps.googleusercontent.com"
                    buttonText="Join with Google"
                    onSuccess={props.onSuccess}
                    onFailure={err =>
                        Raven.captureException(
                            new Error("unable to join with google oauth"),
                            {}
                        )}
                    style={{}}
                    tag="span"
                >
                    <span className="sans-serif br2 shadow-5 f6 link dim ba ph5-ns ph3 pv3 mb2 dib dark-gray pointer inline-flex items-center bg-white">
                        <img
                            src={glogo}
                            className="mh2 dib fl"
                            alt="Google Logo"
                        />
                        {props.isLoggedIn ? (
                            <span className={"dib"}>Joined in with Google</span>
                        ) : (
                            <span className={"dib"}>Join with Google</span>
                        )}
                    </span>
                </GoogleLogin>
            </div>
        );
    }
};

Join.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};

const Login = props => {
    if (props.isLoggedIn) {
        return <Redirect to="/" />;
    } else {
        return (
            <div className="sans-serif mw6 pa5 ma4 tc center">
                <h1 className={"f1"}>Welcome Back</h1>

                <p className={"measure f4 tc"}>
                    Fokal does not save your password. We let Google manage
                    passwords, resets and authentication.
                </p>

                <p className={"measure f4 tc"}>
                    We have plans to add additional providers, if you have one
                    in mind let us know.
                </p>

                <GoogleLogin
                    clientId="927799575891-u91lp3oc5ceksbcrqnv6omvbml5cbe15.apps.googleusercontent.com"
                    buttonText="Join with Google"
                    onSuccess={props.onSuccess}
                    onFailure={err =>
                        Raven.captureException(
                            new Error("unable to log in with google oauth"),
                            {}
                        )}
                    style={{}}
                    tag="span"
                >
                    <span className="sans-serif br2 shadow-5 f6 link dim ba ph5-ns ph3 pv3 mb2 dib dark-gray pointer inline-flex items-center bg-white">
                        <img
                            src={glogo}
                            className="mh2 dib fl"
                            alt="Google Logo"
                        />
                        {props.isLoggedIn ? (
                            <span className={"dib"}>Logged in with Google</span>
                        ) : (
                            <span className={"dib"}>Login with Google</span>
                        )}
                    </span>
                </GoogleLogin>
            </div>
        );
    }
};

Login.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};
export { Join, Login };
