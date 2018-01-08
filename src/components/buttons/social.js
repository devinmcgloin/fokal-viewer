import React from "react";
import { FavoriteImage } from "../../services/api/social";
import { IncrementDownloads } from "../../services/api/retrieval";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { LoggedIn } from "../../services/store/auth";
import { Redirect } from "react-router-dom";

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorited: props.favorited,
            notLoggedIn: false
        };
    }
    render() {
        if (this.state.notLoggedIn) return <Redirect to="/login" />;
        return (
            <span
                onClick={e => {
                    if (!LoggedIn()) {
                        this.setState({ notLoggedIn: true });
                        return;
                    }
                    FavoriteImage(
                        this.props.id,
                        this.state.favorited ? "DELETE" : "PUT"
                    );
                    this.setState(prev => {
                        return {
                            favorited: !prev.favorited
                        };
                    });
                    e.preventDefault();
                }}
                className={
                    "link pointer dim br2 ba ph3 pv2 dib " +
                    (this.state.favorited ? "white bg-red b--white" : "black")
                }
            >
                <span className="flex justify-between">
                    <FontAwesome className="flex" name="heart" />
                    <span className="sans-serif flex pl3 f6">
                        {this.props.count + (this.state.favorited ? 1 : 0)}
                    </span>
                </span>
            </span>
        );
    }
}

Favorite.propTypes = {
    id: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired
};

const RedirectToDownload = (id, imageURL) => {
    IncrementDownloads(id);
    window.open(imageURL + "?dl=fokal-" + id + ".jpg");
};

class Download extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count
        };
    }

    render() {
        return (
            <span
                onClick={e => {
                    RedirectToDownload(this.props.id, this.props.imageURL);
                    this.props.increment();
                    e.preventDefault();
                    this.setState(prev => {
                        return {
                            count: prev.count + 1
                        };
                    });
                }}
                className="link pointer dim br2 ba ph3 pv2 dib black"
            >
                <span className="flex justify-between">
                    <FontAwesome className="flex" name="download" />
                    <span className="sans-serif pl3 f6">
                        {this.state.count}
                    </span>
                </span>
            </span>
        );
    }
}

Download.propTypes = {
    id: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    increment: PropTypes.func
};

export { Favorite, Download };
