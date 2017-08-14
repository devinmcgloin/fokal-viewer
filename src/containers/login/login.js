import React, {
    Component
} from 'react'

import PropTypes from 'prop-types'
import GoogleLogin from 'react-google-login'
import './login.css'
import {Redirect} from 'react-router-dom'

const Login = (props) => {

        if (props.isLoggedIn) {
            return <Redirect to="/"/>
        } else {
            return (
                <div className="mw6 pa5 ma4 tc center">
                    <GoogleLogin
                        clientId="927799575891-u91lp3oc5ceksbcrqnv6omvbml5cbe15.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={props.onSuccess}
                        onFailure={(err) => console.log(err)} style={{}}
                        tag="span">
                            <span className="sans-serif f6 link dim ba ph5 pv3 mb2 dib dark-gray pointer">
                                {props.isLoggedIn ? 'Logged in with Google' : 'Login with Google'}</span>
                    </GoogleLogin>
                </div>
            )
        }
    }

Login.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
};
export {Login};