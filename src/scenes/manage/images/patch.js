import React, {Component} from 'react'
import {Patch} from "../../../services/api/patch";
import PropTypes from 'prop-types'
import {bindAll} from 'lodash'
import Collapsible from 'react-collapsible'
import './collapse.css'

export default class ManageImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            iso: props.image.metadata.iso,
            aperture: props.image.metadata.aperture,
            exposure_time: props.image.metadata.exposure_time,
            focal_length: props.image.metadata.focal_length

        };

        bindAll(this, 'handleChange', 'commitChanges')
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        console.log(name, target.value);
        this.setState({
            [name]: target.value
        })
    }

    commitChanges(e) {
        e.preventDefault();
        Patch(this.state.image.id, 'images', {
            'aperture': this.state.aperture,
            'iso': this.state.iso,
            'exposure_time': this.state.exposure_time,
            'focal_length': this.state.focal_length,
        });
    }

    render() {
        return (
            <div className="sans-serif dt center pt0 pb2 pv3-m pv4-ns w-100">
                <div className="db dtc-ns v-mid-ns">
                    <img src={this.state.image.src_links.medium} alt=""
                         className="w-100 mw3"/>
                </div>
                <Collapsible trigger="Metadata" classParentString="ml2 pa2 w-100 Collapsible">

                    <form onSubmit={this.commitChanges}>
                        <div className="db dtc-ns v-mid ph2 pr0-ns pl3-ns mr5">

                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="ph0 mh0 fw6 clip">Metadata</legend>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Aperture</label>
                                    <input className="b pa2 input-reset ba bg-transparent"
                                           onChange={this.handleChange} type="text" name="aperture"
                                           id="aperture"
                                           value={this.state.aperture}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">ISO</label>
                                    <input className="b pa2 input-reset ba bg-transparent"
                                           onChange={this.handleChange} type="text" name="iso"
                                           id="iso" value={this.state.iso}/>
                                </div>

                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Shutter Speed</label>
                                    <input className="b pa2 input-reset ba bg-transparent"
                                           onChange={this.handleChange} type="text" name="exposure_time"
                                           id="shutter-speed"
                                           value={this.state.exposure_time}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw4 lh-copy f6">Focal Length</label>
                                    <input className="b pa2 input-reset ba bg-transparent"
                                           onChange={this.handleChange} type="text" name="focal_length"
                                           id="focal-length"
                                           value={this.state.focal_length}/>
                                </div>
                            </fieldset>
                            <div className="mt3">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
                                       type="Submit"
                                       value="Submit"/>
                            </div>
                        </div>
                    </form>
                </Collapsible>


            </div>
        )
    }
}

ManageImage.propTypes = {
    image: PropTypes.object.isRequired
};