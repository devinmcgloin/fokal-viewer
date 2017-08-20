import React, {Component} from 'react'
import {FetchMe, Patch, FetchImages} from "../../services/api/api"
import PropTypes from 'prop-types'
import {bindAll} from 'lodash'
import {Loading} from "../../components/loading"

class PatchImage extends Component {
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
        Patch(this.state.image.id, 'i', {
            'aperture':this.state.aperture,
            'iso':this.state.iso,
            'exposure_time':this.state.exposure_time,
            'focal_length':this.state.focal_length,

        });
    }

    render() {
        return (
            <div className="dt center pt0 pb5 pv5-m pv6-ns">
                <div className="db dtc-ns v-mid-ns">
                    <img src={this.state.image.src_links.medium} alt=""
                         className="w-100 mw7"/>
                </div>
                <div className="db dtc-ns v-mid ph2 pr0-ns pl3-ns mr5">
                    <form onSubmit={this.commitChanges}>
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
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6" type="Submit"
                                   value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

PatchImage.propTypes = {
    image: PropTypes.object.isRequired
};

class PatchUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            bio: props.user.bio,
            url: props.user.url,
            name: props.user.name,

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
        Patch(this.state.image.id, 'u', {
            bio: this.state.bio,
            url: this.state.url,
            name: this.state.name,
        });
    }

    render() {
        return (
            <div className="sans-serif dt center pt0 pb5 pv5-m pv6-ns">
                <div className="db dtc-ns v-mid-ns">
                    <img src={this.state.user.avatar_links.medium} alt=""
                         className="w-100 mw7"/>
                </div>
                <div className="db dtc-ns v-mid ph2 pr0-ns pl3-ns mr5">
                    <form onSubmit={this.commitChanges}>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="ph0 mh0 fw6 clip">Personal Data</legend>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6">Name</label>
                                <input className="b pa2 input-reset ba bg-transparent"
                                       onChange={this.handleChange} type="text" name="name"
                                       id="shutter-speed"
                                       value={this.state.name}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6">Bio</label>
                                <input className="b pa2 input-reset ba bg-transparent"
                                       onChange={this.handleChange} type="text" name="bio"
                                       id="aperture"
                                       value={this.state.bio}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw4 lh-copy f6">Personal Site</label>
                                <input className="b pa2 input-reset ba bg-transparent"
                                       onChange={this.handleChange} type="text" name="url"
                                       id="iso" value={this.state.url}/>
                            </div>
                        </fieldset>
                        <div className="mt3">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6" type="Submit"
                                   value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

PatchUser.propTypes = {
    user: PropTypes.object.isRequired
};

class ManageImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            images: [],
            isLoadingUser: true,
            isLoadingImages: true,
        }
    }

    componentDidMount() {
        FetchMe()
            .then((dat) => {
                this.setState({
                    user: dat,
                    isLoadingUser: false
                });

            })
            .catch((err) => console.log(err));

        FetchImages('/u/me/images')
            .then((dat) => this.setState({
                images: dat,
                isLoadingImages: false

            }))
            .catch((err) => console.log(err));
    }

    render() {
        let imgs;
        if (this.state.isLoadingImages)
            imgs = <Loading/>;
        else
            imgs = this.state.images.map((i) => <PatchImage key={i.id} image={i}/>);

        return (
            <div>
                {!this.state.isLoadingUser ? <PatchUser user={this.state.user}/> : null }
                {imgs}
            </div>
        )
    }
}

export {PatchImage, ManageImages};