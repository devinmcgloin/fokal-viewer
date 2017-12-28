import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { FetchImage } from "../services/api/retrieval";
//import { GetUser } from "../services/store/auth";
import { Loading } from "../components/loading";
import { ResponsiveImage } from "../components/image";
import { GridCollection } from "../components/collection";
import { UserStatsCard, UserCard } from "../components/cards/user";
import Measure from "react-measure";
import moment from "moment";

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            id: props.match.params.id,
            isLoading: true,
            failed: false,
            favoritedByUser: false,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
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
        //const username = GetUser();
        //const favorited = image.favorited_by.reduce(
        //(acc, user) => (acc ? acc : user.includes(username)),
        //false
        //);

        const aspect = image.metadata.pixel_xd / image.metadata.pixel_yd;
        const vert =
            this.state.innerWidth / (this.state.innerHeight * aspect) * 100;

        const firstColor = image.colors[0];
        const color = firstColor ? firstColor.hex : "rgb(12, 12, 12)";
        const bg = "#7C8382";
        let cards = [
            <Link
                to={"/u/" + image.user.id}
                key={image.user.id}
                className="no-underline"
            >
                <UserCard user={image.user} />
            </Link>,
            <UserStatsCard
                key="downloads"
                title="Downloads"
                value={image.stats.downloads}
                background={bg}
            />,
            <UserStatsCard
                key="views"
                title="Views"
                value={image.stats.views}
                background={bg}
            />,
            <UserStatsCard
                key="favorites"
                title="Favorites"
                value={image.stats.favorites}
                background={bg}
            />,
            <UserStatsCard
                key="aperture"
                title="Aperture"
                value={"f/" + Math.round(image.metadata.aperture * 100) / 100}
                background={bg}
            />,
            <UserStatsCard
                key="iso"
                title="ISO"
                value={image.metadata.iso}
                background={bg}
            />,
            <UserStatsCard
                key="exposure_time"
                title="Exposure Time"
                value={image.metadata.exposure_time + "s"}
                background={bg}
            />,
            <UserStatsCard
                key="focal_length"
                title="Focal Length"
                value={image.metadata.focal_length + "mm"}
                background={bg}
            />,
            <UserStatsCard
                key="camera"
                title="Camera"
                value={image.metadata.make + " " + image.metadata.model}
                background={bg}
            />,
            <UserStatsCard
                key="capture_time"
                title="Capture Time"
                value={moment(image.metadata.capture_time).format("LL")}
                background={bg}
            />
        ];

        if (image.metadata.location) {
            cards = cards.concat(
                <UserStatsCard
                    key="location"
                    title="Location"
                    value={
                        image.metadata.location.description
                            ? image.metadata.location.description
                            : image.metadata.location.point.lng +
                              ", " +
                              image.metadata.location.point.lat
                    }
                    background={bg}
                />
            );
        }

        cards = cards.concat(
            image.tags.map(t => (
                <UserStatsCard key={t} title="#Tag" value={t} background={bg} />
            ))
        );

        cards = cards.concat(
            image.colors.map(c => (
                <UserStatsCard
                    key={c.hex}
                    title="Color"
                    value={c.hex}
                    background={c.hex}
                />
            ))
        );

        return (
            <div>
                <Measure
                    bounds
                    onResize={contentRect => {
                        this.setState({
                            innerWidth: contentRect.bounds.width
                            //innerHeight: contentRect.bounds.height
                        });
                    }}
                >
                    {({ measureRef }) => (
                        <div
                            ref={measureRef}
                            className={"w-100"}
                            style={{
                                height: vert + "vh",
                                backgroundColor: color
                            }}
                        >
                            <ResponsiveImage
                                className="w-100"
                                imageProps={{ style: { height: vert + "vh" } }}
                                url={image.src_links.raw}
                            />
                        </div>
                    )}
                </Measure>
                <div className="sans-serif center ph3-ns ph1 mt3">
                    <GridCollection cards={cards} />
                </div>
            </div>
        );
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export { ImageContainer };
