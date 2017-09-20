import React, {Component} from 'react'
import {Patch} from "../../../services/api/patch";
import {DeleteImage} from "../../../services/api/delete";
import PropTypes from 'prop-types'
import {bindAll} from 'lodash'
import {TextField} from "../../../components/fields";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs'
import 'react-tabs/style/react-tabs.css';
import './collapse.css'
import {WithContext as ReactTags} from 'react-tag-input';

class ManageImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            iso: props.image.metadata.iso,
            aperture: props.image.metadata.aperture,
            exposure_time: props.image.metadata.exposure_time,
            focal_length: props.image.metadata.focal_length,

            model: props.image.metadata.model,
            make: props.image.metadata.make,
            lens_model: props.image.metadata.lens_model,
            lens_make: props.image.metadata.lens_make,
            tags: props.image.tags.map((v, i) => {
                return {indx: i, text: v}
            }),
            labels: props.image.labels,
        };

        console.log(props.image.labels)

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
            'aperture': Number(this.state.aperture),
            'iso': Number(this.state.iso),
            'exposure_time': this.state.exposure_time,
            'focal_length': Number(this.state.focal_length),

            'make': this.state.make,
            'model': this.state.model,
            'lens_make': this.state.lens_make,
            'lens_model': this.state.lens_model,
            'tags': this.state.tags.map(({text}) => text)
        });
    }

    render() {
        return (
            <div className="sans-serif dib pv3 mv4 w-100">
                <div className="fl w-100 w-50-m w-50-l dt pa2">
                    <img src={this.state.image.src_links.medium} alt=""
                         className="dtc v-mid"/>
                </div>
                <Tabs className={"fl mw6 w-100 w-50-m w-50-l"}>
                    <TabList>
                        <Tab>Exif</Tab>
                        <Tab>Tags</Tab>
                        <Tab>Gear</Tab>
                        <Tab>Delete</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns  dib">
                            <form onSubmit={this.commitChanges}>
                                <TextField handleChange={this.handleChange} name="aperture" val={this.state.aperture}
                                           desc="Your name will be displayed alongside your username." optional={true}/>

                                <TextField handleChange={this.handleChange} name="iso" presentation_name={"ISO"}
                                           val={this.state.iso}
                                           desc="Your location will appear on your profile and be available for searches."
                                           optional={true}/>

                                <TextField handleChange={this.handleChange} name="exposure_time"
                                           presentation_name={"Exposure Time"} val={this.state.exposure_time}
                                           desc="The portfolio link is present on your profile page." optional={true}/>

                                <TextField handleChange={this.handleChange} name="focal_length"
                                           presentation_name={"Focal Length"} val={this.state.focal_length}
                                           desc="Adding your Instagram allows us to feature you on Instagram."
                                           optional={true}/>


                                <div className="mt3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
                                           type="Submit"
                                           value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns dib">
                            <form onSubmit={this.commitChanges}>


                                <div className="measure">
                                    <label htmlFor={name} className="f6 b db mb2 ttc">Tags
                                        <span className="normal black-60">(optional)</span></label>
                                    <ReactTags tags={this.state.tags}
                                        // suggestions={this.state.labels}
                                               handleDelete={(i) => {
                                                   let tags = this.state.tags;
                                                   console.log(tags);
                                                   tags.splice(i, 1);
                                                   console.log(tags);
                                                   this.setState({tags: tags})
                                               }}
                                               handleAddition={(tag) => {
                                                   let tags = this.state.tags;
                                                   tags.push({
                                                       id: tags.length + 1,
                                                       text: tag
                                                   });
                                                   this.setState({tags: tags})
                                               }}
                                               classNames={{
                                                   tags: 'pv2',
                                                   tagInputField: 'input-reset ba b--black-20 pa2 br2 mb2 db w-100 mv2',
                                                   tag: 'ma1 pa2 br2 bg-blue white dib',
                                               }}/>
                                    <small id={'tags-desc'} className="f6 black-60 db mb2">Tags appear on the image page and are available for searching.</small>
                                </div>

                                <div className="mt3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
                                           type="Submit"
                                           value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns dib">
                            <form onSubmit={this.commitChanges}>
                                <TextField handleChange={this.handleChange} name="make" val={this.state.make}
                                           desc="Your name will be displayed alongside your username." optional={true}/>

                                <TextField handleChange={this.handleChange} name="model" val={this.state.model}
                                           desc="Your location will appear on your profile and be available for searches."
                                           optional={true}/>

                                <TextField handleChange={this.handleChange} name="lens_make"
                                           presentation_name={"Lens Make"} val={this.state.lens_make}
                                           desc="The portfolio link is present on your profile page." optional={true}/>

                                <TextField handleChange={this.handleChange} name="lens_model"
                                           presentation_name={"Lens Model"} val={this.state.lens_model}
                                           desc="Adding your Instagram allows us to feature you on Instagram."
                                           optional={true}/>


                                <div className="mt3">
                                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6"
                                           type="Submit"
                                           value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="fl ph2 pr0-ns pl3-ns dib">
                            <p className="measure f7">Deleting an image cannot be undone. All stats, favorites, tags will loose access to this image. Users who have downloaded it will retain their own copy.</p>
                            <button className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-red hover-bg-dark-red white" onClick={() => DeleteImage(this.state.image.id)}>
                            Delete
                            </button>
                        </div>
                    </TabPanel>
                </Tabs>


            </div>
        )
    }
}

ManageImage.propTypes = {
    image: PropTypes.object.isRequired
};


const ManageImages = ({images}) =>
    <div>
        {images.map(i => <ManageImage key={i.id} image={i}/>)}
    </div>;
ManageImages.propTypes = {
    images: PropTypes.array.isRequired
};

export {ManageImages};
