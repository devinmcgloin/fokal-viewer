import React, { Component } from "react";
import { Patch } from "../../../services/api/patch";
import { FetchImages } from "../../../services/api/retrieval";
import { DeleteImage } from "../../../services/api/delete";
import PropTypes from "prop-types";
import { bindAll } from "lodash";
import { TextField } from "../../../components/fields";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./collapse.css";
import { ErrorAlert, SuccessAlert } from "../../../components/alerts";
import { Creatable } from "react-select";
import "react-select/dist/react-select.css";
import Geosuggest from "react-geosuggest";
import Script from "react-load-script";
import { Error } from "../../../components/error";
import { Loading } from "../../../components/loading";

/* global process */
const google_key = process.env.REACT_APP_GOOGLE_KEY;

class ManageImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,

            status: ""
        };

        bindAll(this, "handleSubmit");
    }

    handleSubmit(resp) {
        resp.ok
            ? this.setState({ status: "success" })
            : this.setState({ status: "failure" });
        setTimeout(() => this.setState({ status: "" }), 5000);
    }

    render() {
        let alert = null;
        if (this.state.status === "success")
            alert = (
                <SuccessAlert
                    message="Image Attributes Changed."
                    active={this.state.status !== ""}
                />
            );
        else if (this.state.status === "failure")
            alert = (
                <ErrorAlert
                    message="Failed to update image attributes."
                    active={this.state.status !== ""}
                />
            );

        return (
            <div
                id={this.state.image.id}
                className="sans-serif dib pv3 mv4 w-100"
            >
                {alert}
                <div className="fl w-100 w-50-m w-50-l dt pa2">
                    <img
                        src={this.state.image.src_links.medium}
                        alt=""
                        className="dtc v-mid"
                    />
                </div>
                <Tabs className={"fl mw6 w-100 w-50-m w-50-l"}>
                    <TabList>
                        <Tab>Exif</Tab>
                        <Tab>Geo</Tab>
                        <Tab>Tags</Tab>
                        <Tab>Gear</Tab>
                        <Tab>Delete</Tab>
                    </TabList>
                    <TabPanel>
                        <Exif
                            image={this.props.image}
                            onSubmit={this.handleSubmit}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Geo
                            image={this.props.image}
                            onSubmit={this.handleSubmit}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Tags
                            image={this.state.image}
                            onSubmit={this.handleSubmit}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Gear
                            image={this.state.image}
                            onSubmit={this.handleSubmit}
                        />
                    </TabPanel>

                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns dib w-100">
                            <p className="measure f7">
                                Deleting an image cannot be undone. All stats,
                                favorites, tags will loose access to this image.
                                Users who have downloaded it will retain their
                                own copy.
                            </p>
                            <button
                                className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-red hover-bg-dark-red white"
                                onClick={() =>
                                    DeleteImage(
                                        this.state.image.id
                                    ).then(resp => {
                                        this.handleSubmit(resp);
                                        this.props.onDelete(this.props.indx);
                                    })}
                            >
                                Delete
                            </button>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

ManageImage.propTypes = {
    image: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    indx: PropTypes.number.isRequired
};

class Exif extends Component {
    constructor(props) {
        super(props);
        const metadata = props.image.metadata;
        this.image_id = props.image.id;
        this.state = {
            aperture: metadata.aperture,
            iso: metadata.iso,
            exposure_time: metadata.exposure_time,
            focal_length: metadata.focal_length
        };
        bindAll(this, "handleChange", "submit");
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    submit(e) {
        e.preventDefault();
        Patch(this.image_id, "images", {
            aperture: Number(this.state.aperture),
            iso: Number(this.state.iso),
            exposure_time: this.state.exposure_time,
            focal_length: Number(this.state.focal_length)
        }).then(resp => this.props.onSubmit(resp));
    }

    render() {
        return (
            <div className="fl ph2 pr0-ns pl3-ns dib w-100">
                <form onSubmit={this.submit}>
                    <TextField
                        handleChange={this.handleChange}
                        name="aperture"
                        val={this.state.aperture}
                        desc=""
                        optional={true}
                    />

                    <TextField
                        handleChange={this.handleChange}
                        name="iso"
                        presentation_name={"ISO"}
                        val={this.state.iso}
                        desc="Your location will appear on your profile and be available."
                        optional={true}
                    />

                    <TextField
                        handleChange={this.handleChange}
                        name="exposure_time"
                        presentation_name={"Exposure Time"}
                        val={this.state.exposure_time}
                        desc="The portfolio link is present on your profile page."
                        optional={true}
                    />

                    <TextField
                        handleChange={this.handleChange}
                        name="focal_length"
                        presentation_name={"Focal Length"}
                        val={this.state.focal_length}
                        desc="Adding your Instagram allows us to feature you on Instagram."
                        optional={true}
                    />

                    <div className="mt3">
                        <input
                            className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                            type="Submit"
                            value={this.props.buttonValue}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        );
    }
}

Exif.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        metadata: PropTypes.object.isRequired
    }),
    onSubmit: PropTypes.func.isRequired,
    buttonValue: PropTypes.string
};

Exif.defaultProps = {
    buttonValue: "Submit"
};

class Tags extends Component {
    constructor(props) {
        super(props);
        this.image_id = props.image.id;
        this.state = {
            tags: props.image.tags.map(v => {
                return { label: v, value: v };
            })
        };
        bindAll(this, "handleSubmit");
    }

    handleSubmit(e) {
        e.preventDefault();
        Patch(this.image_id, "images", {
            tags: this.state.tags.map(({ value }) => value)
        }).then(resp => this.props.onSubmit(resp));
    }

    render() {
        return (
            <div className="fl ph2 pr0-ns pl3-ns dib w-100">
                <form onSubmit={this.handleSubmit}>
                    <div className="measure">
                        <label htmlFor={name} className="f6 b db mb2 ttc">
                            Tags
                            <span className="normal black-60">(optional)</span>
                        </label>
                        <Creatable
                            multi={true}
                            value={this.state.tags}
                            options={[]}
                            onChange={v => this.setState({ tags: v })}
                        />

                        <small
                            id={"tags-desc"}
                            className="f6 black-60 db mb2 mt1"
                        >
                            Tags appear on the image page and are available for
                            searching.
                        </small>
                    </div>

                    <div className="mt3">
                        <input
                            className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                            type="Submit"
                            value={this.props.buttonValue}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        );
    }
}

Tags.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    onSubmit: PropTypes.func.isRequired,

    buttonValue: PropTypes.string
};

Tags.defaultProps = {
    buttonValue: "Submit"
};

class Gear extends Component {
    constructor(props) {
        super(props);
        this.image_id = props.image.id;
        this.state = {
            model: props.image.metadata.model,
            make: props.image.metadata.make,
            lens_model: props.image.metadata.lens_model,
            lens_make: props.image.metadata.lens_make
        };
        bindAll(this, "handleChange", "handleSubmit");
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        Patch(this.image_id, "images", {
            make: this.state.make,
            model: this.state.model,
            lens_make: this.state.lens_make,
            lens_model: this.state.lens_model
        }).then(resp => this.props.onSubmit(resp));
    }

    render() {
        return (
            <div className="fl ph2 pr0-ns pl3-ns dib w-100">
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        handleChange={this.handleChange}
                        name="make"
                        val={this.state.make}
                        desc="Your name will be displayed alongside your username."
                        optional={true}
                    />

                    <TextField
                        handleChange={this.handleChange}
                        name="model"
                        val={this.state.model}
                        desc="Your location will appear on your profile and be available for searches."
                        optional={true}
                    />

                    <TextField
                        handleChange={this.handleChange}
                        name="lens_make"
                        presentation_name={"Lens Make"}
                        val={this.state.lens_make}
                        desc="The portfolio link is present on your profile page."
                        optional={true}
                    />

                    <TextField
                        handleChange={this.handleChange}
                        name="lens_model"
                        presentation_name={"Lens Model"}
                        val={this.state.lens_model}
                        desc="Adding your Instagram allows us to feature you on Instagram."
                        optional={true}
                    />

                    <div className="mt3">
                        <input
                            className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                            type="Submit"
                            value={this.props.buttonValue}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        );
    }
}

Gear.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        metadata: PropTypes.object.isRequired
    }),
    onSubmit: PropTypes.func.isRequired,
    buttonValue: PropTypes.string
};

Gear.defaultProps = {
    buttonValue: "Submit"
};

class Geo extends Component {
    constructor(props) {
        super(props);
        this.image_id = props.image.id;
        const loc = props.image.metadata && props.image.metadata.location;
        this.state = {
            lat: loc ? loc.point.lat : "",
            lng: loc ? loc.point.lng : "",
            description: loc ? loc.description : "",
            script: "loading"
        };
        bindAll(this, "handleSubmit");
    }

    handleSubmit(e) {
        e.preventDefault();
        Patch(this.image_id, "images", {
            geo: {
                lat: this.state.lat,
                lng: this.state.lng,
                description: this.state.description
            }
        }).then(resp => this.props.onSubmit(resp));
    }
    render() {
        let center;
        if (this.state.script === "loading") center = <Loading />;
        else if (this.state.script === "failure") center = <Error />;
        else
            center = (
                <form onSubmit={this.handleSubmit}>
                    <Geosuggest
                        onSuggestSelect={location =>
                            this.setState({
                                description: location.label,
                                lat: location.location.lat,
                                lng: location.location.lng
                            })}
                        className="w-100 measure"
                        inputClassName="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                        suggestsClassName="list pl0 ml0 center mw6 ba b--light-silver br2"
                        suggestItemClassName="ph3 pv3 bb b--light-silver"
                        suggestItemActiveClassName="bg-light-blue"
                    />
                    <TextField
                        handleChange={() => {}}
                        desc={"Formatted Address"}
                        name="description"
                        presentation_name={"Address"}
                        val={this.state.description}
                        optional={false}
                        readOnly
                    />

                    <div className="measure">
                        <div className="fl w-50 pr1">
                            <TextField
                                handleChange={() => {}}
                                presentation_name={"Latitude"}
                                name={"lat"}
                                val={this.state.lat}
                                optional={false}
                                readOnly
                            />
                        </div>
                        <div className="fl w-50 pl1">
                            <TextField
                                handleChange={() => {}}
                                presentation_name={"Longitude"}
                                name={"lng"}
                                val={this.state.lng}
                                optional={false}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="fl w-100 mt3">
                        <input
                            className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                            type="Submit"
                            value={this.props.buttonValue}
                            readOnly
                        />
                    </div>
                </form>
            );

        return (
            <div className="fl ph2 pr0-ns pl3-ns dib w-100">
                <Script
                    url={
                        "https://maps.googleapis.com/maps/api/js?key=" +
                        google_key +
                        "&libraries=places"
                    }
                    onLoad={() => this.setState({ script: "success" })}
                    onError={err => {
                        console.log(err);
                        this.setState({ script: "failure" });
                    }}
                />
                {center}
            </div>
        );
    }
}

Geo.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        metadata: PropTypes.object.isRequired
    }),
    onSubmit: PropTypes.func.isRequired,

    buttonValue: PropTypes.string
};

Geo.defaultProps = {
    buttonValue: "Submit"
};

class ManageImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "loading",
            images: []
        };
        bindAll(this, "handleDelete");
    }

    componentDidMount() {
        FetchImages("/users/me/images")
            .then(resp => {
                if (resp.ok)
                    resp.body.then(d =>
                        this.setState({
                            images: d,
                            status: ""
                        })
                    );
                else this.setState({ status: "failed" });
            })
            .catch(err => console.log(err));
    }

    handleDelete(indx) {
        setTimeout(
            () =>
                this.setState(prev => {
                    let img = prev.images;
                    img.splice(indx, 1);
                    return { images: img };
                }),
            1000
        );
    }

    render() {
        if (this.state.status === "loading") return <Loading />;
        return (
            <div>
                {this.state.images.map((image, indx) => (
                    <ManageImage
                        key={image.id}
                        image={image}
                        indx={indx}
                        onDelete={this.handleDelete}
                    />
                ))}
            </div>
        );
    }
}
ManageImages.propTypes = {
    images: PropTypes.array.isRequired
};

export { ManageImages, ManageImage, Exif, Tags, Geo, Gear };
