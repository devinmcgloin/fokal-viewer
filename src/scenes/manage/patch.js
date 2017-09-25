import React, { Component } from "react";
import { Patch } from "../../services/api/patch";
import { FetchImages, FetchMe } from "../../services/api/retrieval";
import PropTypes from "prop-types";
import { bindAll } from "lodash";
import Raven from "raven-js";
import { Link, Route, Switch } from "react-router-dom";
import { Loading } from "../../components/loading";
import { TextArea, TextField } from "../../components/fields";
import { ErrorAlert, SuccessAlert } from "../../components/alerts";
import { ManageImages } from "./images/patch";

class ManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            bio: props.user.bio,
            portfolio: props.user.url,
            name: props.user.name,
            location: props.user.location,
            instagram: props.user.instagram,
            twitter: props.user.twitter,
            username: props.user.id
        };

        bindAll(this, "handleChange", "commitChanges");
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        console.log(name, target.value);
        this.setState({
            [name]: target.value
        });
    }

    commitChanges(e) {
        e.preventDefault();
        Patch("me", "users", {
            bio: this.state.bio,
            url: this.state.portfolio,
            name: this.state.name,
            instagram: this.state.instagram,
            twitter: this.state.twitter,
            username: this.state.username
        }).then(
            resp =>
                resp.ok
                    ? this.setState({ action: "success" })
                    : this.setState({ action: "failure" })
        );
    }

    render() {
        let alert = null;
        if (this.state.action === "success")
            alert = <SuccessAlert message="User Settings Changed." />;
        else if (this.state.action === "failure")
            alert = <ErrorAlert message="Failed to update user settings." />;

        return (
            <div className="sans-serif pt0 pb2 pv1-m pv2-ns">
                {alert}
                <div className="tc pv2 measure center">
                    <img
                        src={this.state.user.avatar_links.medium}
                        alt="avatar"
                        className="br1 h4 w4 dib"
                    />
                </div>
                <div className="measure center">
                    <form onSubmit={this.commitChanges}>
                        <TextField
                            handleChange={this.handleChange}
                            name="name"
                            val={this.state.name}
                            desc="Your name will be displayed alongside your username."
                            optional={true}
                        />
                        <TextField
                            handleChange={this.handleChange}
                            name="username"
                            val={this.state.username}
                            desc="Your username is how your account is referenced on the site (3 characters or more)"
                            optional={false}
                        />

                        <TextField
                            handleChange={this.handleChange}
                            name="location"
                            val={this.state.location}
                            desc="Your location will appear on your profile and be available for searches."
                            optional={true}
                        />

                        <TextField
                            handleChange={this.handleChange}
                            name="portfolio"
                            val={this.state.portfolio}
                            desc="The portfolio link is present on your profile page."
                            optional={true}
                        />

                        <TextField
                            handleChange={this.handleChange}
                            name="instagram"
                            val={this.state.instagram}
                            desc="Adding your Instagram allows us to feature you on Instagram."
                            optional={true}
                        />

                        <TextField
                            handleChange={this.handleChange}
                            name="twitter"
                            val={this.state.twitter}
                            desc="Adding your Twitter allows us to feature you on Twitter."
                            optional={true}
                        />

                        <TextArea
                            handleChange={this.handleChange}
                            name="bio"
                            val={this.state.bio}
                            desc="Your bio is accessible in searches and on your profile page."
                            optional={true}
                        />

                        <div className="mt3">
                            <input
                                className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                                type="Submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

ManageUser.propTypes = {
    user: PropTypes.object.isRequired
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
        };
    }

    componentDidMount() {
        FetchMe()
            .then(resp => {
                if (resp.ok)
                    resp.body.then(d =>
                        this.setState({
                            user: d,
                            isLoadingUser: false
                        })
                    );
                else this.setState({ failed: true });
            })
            .catch(err => Raven.captureException(err));

        FetchImages("/users/me/images")
            .then(resp => {
                if (resp.ok)
                    resp.body.then(d =>
                        this.setState({
                            images: d,
                            isLoadingImages: false
                        })
                    );
                else this.setState({ failed: true });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="sans-serif">
                <nav className="ph3 ph4-ns pv2 pv3-ns bb b--black-10 black-70">
                    <div className="nowrap overflow-x-auto">
                        <Link
                            className="sans-serif link dim gray    f6 f5-ns dib mr3"
                            title="Images"
                            to={this.props.match.url}
                        >
                            Account
                        </Link>
                        <Link
                            className="sans-serif link dim gray    f6 f5-ns dib mr3"
                            title="Favorites"
                            to={this.props.match.url + "/manage"}
                        >
                            Manage
                        </Link>
                    </div>
                </nav>
                <div className="w-100 pa3">
                    {this.state.isLoadingUser ? (
                        <Loading />
                    ) : (
                        <Switch>
                            <Route
                                exact
                                path={this.props.match.url}
                                render={() => (
                                    <ManageUser user={this.state.user} />
                                )}
                            />
                            <Route
                                path={this.props.match.url + "/manage"}
                                render={() => (
                                    <ManageImages images={this.state.images} />
                                )}
                            />
                            {/*<Route exact path={this.props.match.url} render={() => <DeleteUser user={this.state.user}/>}/>*/}
                        </Switch>
                    )}
                </div>
            </div>
        );
    }
}

Account.propTypes = {
    match: PropTypes.object.isRequired
};

export { Account };
