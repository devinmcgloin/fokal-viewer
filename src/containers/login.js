import React, {
    Component
} from 'react'

import PropTypes from 'prop-types'
import Script from 'react-load-script'
import {bindAll} from 'lodash'

/* global gapi */

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = props.onSuccess;

        bindAll(this, 'onFailure', 'renderButton', 'onSuccess')
    }

    onFailure(err) {
        console.log(err)
    }

    renderButton() {

        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'onsuccess': this.onSuccess,
            'onfailure': this.onFailure
        });


    }


    render() {
        return (
            <div>
                <Script url="https://apis.google.com/js/platform.js"
                        onLoad={this.renderButton}
                        onError={this.onFailure}/>
                <div className="ma7">
                    <div id="my-signin2"/>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    onSuccess: PropTypes.func.isRequired
};
export {Login};