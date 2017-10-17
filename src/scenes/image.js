import React, { Component } from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { FetchImage } from "../services/api/retrieval";
import { GetUser } from "../services/store/auth";
import { Loading } from "../components/loading";
import { Download, Favorite } from "../components/buttons/social";
import { User } from "../components/image/user";
import { Location } from "../components/image/location";
import { Metadata } from "../components/image/metadata";
import { Stats } from "../components/image/stats";
import { Colors } from "../components/image/colors";
import { Tags } from "../components/image/tags";
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
        if (this.state.failed) return <Redirect to="/404" />;

        const image = this.state.image;
        const username = GetUser();
        const favorited = image.favorited_by.reduce(
            (acc, user) => (acc ? acc : user.includes(username)),
            false
        );

        const aspect = image.metadata.pixel_xd / image.metadata.pixel_yd;
        const vert = window.innerWidth / (window.innerHeight * aspect) * 100;
        console.log(aspect, vert);

        return (
            <div>
                <div
                    className={"bg-near-black vw-100"}
                    style={{ height: vert + "vh" }}
                >
                    <ResponsiveImage
                        className="vw-100"
                        imageProps={{ style: { height: vert + "vh" } }}
                        url={image.src_links.raw}
                    />
                </div>
                <div className="ph4-l h3-ns h2 ph2 flex justify-between">
                    <div className="w-50">
                        <User
                            name={image.user.name}
                            username={image.user.id}
                            avatarURL={image.user.avatar_links.small}
                        />
                    </div>

                    <div className="dt h-100 pa2">
                        <span className="dtc v-mid pr1">
                            <Download
                                id={image.id}
                                imageURL={image.src_links.raw}
                                count={image.stats.downloads}
                            />
                        </span>

                        <span className="dtc v-mid pl1">
                            <Favorite
                                id={image.id}
                                favorited={favorited}
                                count={image.stats.favorites}
                            />
                        </span>
                    </div>
                </div>
                <div className="bg-white pa2 ma3 mt4 w-80-l w-90 center">
                    <Stats {...image.stats} />
                    <hr className="w-90 near-black mv4" />
                    {image.metadata.location ? (
                        <span className="w-80 center flex justify-around">
                            <Location {...image.metadata.location} />
                        </span>
                    ) : null}

                    <Metadata {...image.metadata} />

                    {image.tags.length !== 0 ? (
                        <span>
                            <hr className="w-90 near-black mv4" />
                            <Tags tags={image.tags} />
                        </span>
                    ) : null}

                    {image.colors.length !== 0 ? (
                        <span>
                            <hr className="w-90 near-black mv4" />
                            <Colors colors={image.colors} />
                        </span>
                    ) : null}
                </div>
            </div>
        );
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export { ImageContainer };
