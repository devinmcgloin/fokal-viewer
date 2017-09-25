import React from "react";
import { FavoriteImage } from "../../services/api/social";
import { IncrementDownloads } from "../../services/api/retrieval";
import PropTypes from "prop-types";

class Favorite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorited: props.favorited
        };
    }
    render() {
        return (
            <div
                onClick={e => {
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
            >
                <dd
                    className={
                        "pointer link dim f2 f-subheadline-l fw6 ml0 " +
                        (this.state.favorited ? "red" : "mid-gray")
                    }
                >
                    {this.state.favorited ? "Favorited" : "Favorite"}
                </dd>
            </div>
        );
    }
}

Favorite.propTypes = {
    id: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired
};

const Redirect = (id, imageURL) => {
    IncrementDownloads(id);
    window.open(imageURL + "?dl=fokal-" + id + ".jpg");
};

const Download = ({ id, imageURL }) => (
    <div
        onClick={e => {
            console.log(id, imageURL);
            Redirect(id, imageURL);
            e.preventDefault();
        }}
    >
        <dd className="pointer link dim mid-gray f2 f-subheadline-l fw6 ml0">
            Download
        </dd>
    </div>
);

Download.propTypes = {
    id: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired
};

export { Favorite, Download };
