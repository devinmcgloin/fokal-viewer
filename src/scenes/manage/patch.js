import React, {Component} from 'react'
import {Patch} from "../../services/api/patch";
import {FetchImages, FetchMe} from "../../services/api/retrieval";
import PropTypes from 'prop-types'
import {bindAll} from 'lodash'
import Raven from 'raven-js'
import {Route, Switch, Link} from 'react-router-dom'
import {Loading} from "../../components/loading";

class ManageUser extends Component {
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
        Patch(this.state.user.id, 'user', {
            bio: this.state.bio,
            url: this.state.url,
            name: this.state.name,
        });
    }

    render() {
        return (
            <div className="sans-serif dt center pt0 pb2 pv3-m pv4-ns">
                <div className="db dtc-ns v-mid-ns">
                    <img src={this.state.user.avatar_links.medium} alt=""
                         className="w-100 mw6"/>
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

ManageUser.propTypes = {
    user: PropTypes.object.isRequired,
};

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            images: [],
            isLoadingUser: true,
            isLoadingImages: true,
            failed: false
        }
    }

    componentDidMount() {
        FetchMe()
            .then((resp) => {
                if (resp.ok)
                    resp.body.then(d =>
                        this.setState({
                            user: d,
                            isLoadingUser: false
                        }));
                else
                    this.setState({failed: true})

            })
            .catch((err) => Raven.captureException(err));

        FetchImages('/users/me/images')
            .then((resp) => {
                if (resp.ok)
                    resp.body.then(d =>
                        this.setState({
                            images: d,
                            isLoadingImages: false
                        }));
                else
                    this.setState({failed: true})
            })

            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div className="sans-serif">
                <div className="w-100 w-30-ns fl pa3">
                    <ul className="no-underline link hover dim black nested-list-reset">
                        <li><Link to={this.props.match.url}>Account</Link></li>
                        <li><Link to={this.props.match.url + '/manage'}>Manage Images</Link></li>
                        <li><Link to={this.props.match.url + '/delete'}>Delete</Link></li>
                    </ul>
                </div>
                <div className="w-100 w-70-ns fl pa3">
                {this.state.isLoadingUser ? <Loading/> :
                    <Switch>
                        <Route exact path={this.props.match.url} render={() => <ManageUser user={this.state.user}/>}/>
                        {/*<Route exact path={this.props.match.url} render={() => <ManageImages user={this.state.images}/>}/>*/}
                        {/*<Route exact path={this.props.match.url} render={() => <DeleteUser user={this.state.user}/>}/>*/}

                    </Switch>
                }
                </div>
            </div>
        )
    }
}

Account.propTypes = {
    match: PropTypes.object.isRequired,
};

export {Account};