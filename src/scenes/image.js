import React, { Component } from "react";

import PropTypes from "prop-types";
import { FetchImage } from "../services/api/retrieval";
import { GetUser } from "../services/store/auth";
import { Loading } from "../components/loading";
import { ResponsiveImage } from "../components/image";

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            id: props.match.params.id,
            isLoading: true,
            failed: false,
            favoritedByUser: false
        };
    }

    loadImageFromServer() {
        let t = this;
        FetchImage(this.state.id).then(data => {
            if (data.ok)
                data.body.then(b => {
                    t.setState({
                        image: b,
                        isLoading: false
                    });
                });
            else t.setState({ isLoading: false, failed: true });
        });
    }

    componentDidMount() {
        this.loadImageFromServer();
    }

    render() {
        if (this.state.isLoading) return <Loading />;

        const image = this.state.image;
        const username = GetUser();
        const favorited = image.favorited_by.reduce(
            (acc, user) => (acc ? acc : user.includes(username)),
            false
        );

        console.log(favorited);

        const aspect = image.metadata.pixel_xd / image.metadata.pixel_yd;
        const vert = window.innerWidth / (window.innerHeight * aspect) * 100;
        console.log(aspect, vert);

        const firstColor = image.colors[0];
        const color = firstColor ? firstColor.hex : "rgb(12, 12, 12)";

        return (
            <div
                className={"vw-100"}
                style={{ height: vert + "vh", backgroundColor: color }}
            >
                <ResponsiveImage
                    className="vw-100"
                    imageProps={{ style: { height: vert + "vh" } }}
                    url={image.src_links.raw}
                />
            </div>
        );
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export { ImageContainer };
