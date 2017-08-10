import React, {
    Component
} from 'react'

import './login.css'

/* global gapi */

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = props.onSuccess

    }

    onFailure(err) {
        console.log(err)
    }

    componentDidMount() {

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
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{marginTop: '5rem'}}>
                    <div id="my-signin2"/>
                </div>
            </div>
        )
    }
}

export {Login};