import React from 'react'
import {FetchImage, Patch} from "../api"
import PropTypes from 'prop-types'

class PatchImage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imageId: props.id,
            image: null,
            changes: {}
        }
    }

    commitChanges() {
        Patch(this.state.imageId, 'i', this.state.changes)
    }

    fetchImages(){
        FetchImage(this.state.imageId)
            .then((data) =>
                this.setState({image: data})
            )
    }

    render() {
        return (
            <div className="dt mw6 center pt0 pb5 pv5-m pv6-ns">
                <div className="db dtc-ns v-mid-ns">
                    <img src="http://tachyons.io/img/super-wide.jpg" alt="A bright blue sky" className="w-100 mw7 w5-ns" />
                </div>
                <div className="db dtc-ns v-mid ph2 pr0-ns pl3-ns">
                    <form onSubmit={this.commitChanges}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6">Email address</label>
                                <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent" type="password" name="password"  id="password"/>
                            </div>
                        </fieldset>
                        <div className="mt3"><input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"/></div>
                    </form>
                </div>
            </div>
        )
    }
}

PatchImage.propTypes = {
    id: PropTypes.string.isRequired
};

export {PatchImage};