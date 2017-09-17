import React, {Component} from 'react'

import PropTypes from 'prop-types';
import {FetchImage} from "../services/api/retrieval";
import {Loading} from "../components/loading"
// import {UserCard} from "../components/cards/user";
// // import {Link} from 'react-router-dom'
// import {MetadataCard} from "../components/cards/metadata";
// import {ColorCard} from "../components/cards/color";
// import {MapCard} from "../components/cards/geo";
import moment from 'moment'
import {Link} from 'react-router-dom'
import {Stats} from '../components/stats'

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            id: props.match.params.id,
            isLoading: true,
            failed: false,
        };
    }

    loadImageFromServer() {
        let t = this;
        FetchImage(this.state.id)
            .then((data) => {
                if (data.ok)
                    data.body.then((b) =>
                        t.setState({
                            image: b,
                            isLoading: false,
                        })
                    );
                else
                    t.setState({isLoading: false, failed: true})
            })

    }

    componentDidMount() {
        this.loadImageFromServer()
    }

    render() {

        if (this.state.isLoading)
            return <Loading/>;

        const image = this.state.image;
        return <div>
            <div className={'pv3'}>
                <div style={{
                    background: 'url(' + image.src_links.large + ') center center no-repeat',
                    width: '90vw',
                    height: '90vh',
                    backgroundSize: 'contain',
                }}
                     className={'center'}>
                </div>
            </div>
            <article className="sans-serif pa3 pa5-ns" data-name="slab-stat-large">
                <h3 className="f6 ttu tracked">Photographer</h3>
                <div className="cf">
                    <dl className="db dib-l w-auto-l lh-title mr6-l">
                        <dd className="f6 fw4 ml0">Name</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">
                            <Link to={'/u/' + image.user.id}
                                  className={'link dim mid-gray'}>{image.user.name || image.user.id}</Link>
                        </dd>
                    </dl>
                    <dl className="db dib-l w-auto-l lh-title">
                        <dd className="f6 fw4 ml0">Location</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{image.user.location || '--'}</dd>
                    </dl>
                </div>
            </article>
            <article className="sans-serif pa3 pa5-ns" data-name="slab-stat-large">
                <h3 className="f6 ttu tracked">Metadata</h3>
                <div className="cf">
                    <dl className="db dib-l w-auto-l lh-title mr6-l">
                        <dd className="f6 fw4 ml0">ISO</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{image.metadata.iso || '--'}</dd>
                    </dl>
                    <dl className="db dib-l w-auto-l lh-title mr6-l">
                        <dd className="f6 fw4 ml0">Aperture</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{image.metadata.aperture || '--'}</dd>
                    </dl>
                    <dl className="db dib-l w-auto-l lh-title mr6-l">
                        <dd className="f6 fw4 ml0">Exposure Time</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{image.metadata.exposure_time || '--'}</dd>
                    </dl>
                    <dl className="db dib-l w-auto-l lh-title mr6-l">
                        <dd className="f6 fw4 ml0">Focal Length</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{image.metadata.focal_length || '--'}</dd>
                    </dl>
                    <dl className="db dib-l w-auto-l lh-title mr6-l">
                        <dd className="f6 fw4 ml0">Capture Time</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{moment(image.metadata.capture_time).format("MMM Do YY") || '--'}</dd>
                    </dl>
                    <dl className="db dib-l w-auto-l lh-title">
                        <dd className="f6 fw4 ml0">Resolution</dd>
                        <dd className="f2 f-subheadline-l fw6 ml0">{(image.metadata.pixel_xd || '--') + 'x' + (image.metadata.pixel_yd || '--')}</dd>
                    </dl>
                </div>
            </article>
            <Stats title={'Stats'} stats={image.stats}/>
            {image.tags.length !== 0 ?
                <article className="sans-serif pa3 pa5-ns" data-name="slab-stat-large">
                    <h3 className="f6 ttu tracked">Tags</h3>
                    <ul className="pl0">
                        {image.tags.map(t => <li key={t} className="dib mr2">
                                <Link to={'/t/' + t} className="f4 f2-ns b db pa2 link dim mid-gray">{t}</Link>
                            </li>
                        )}
                    </ul>
                </article> : null}

            {image.metadata.location ?
                <article className="sans-serif pa3 pa5-ns" data-name="slab-stat-large">
                    <h3 className="f6 ttu tracked">Location</h3>
                    <div className="cf">
                        <dl className="db dib-ns w-auto-ns lh-title mr6-ns">
                            <dd className="f6 fw4 ml0">Description</dd>
                            <dd className="f2 f-subheadline-ns fw6 ml0">{image.metadata.location.description || '--'}</dd>
                        </dl>
                        <dl className="db dib-ns w-auto-ns lh-title mr6-ns">
                            <dd className="f6 fw4 ml0">Longitude</dd>
                            <dd className="f2 f-subheadline-ns fw6 ml0">{image.metadata.location.point.X.toFixed(3)}</dd>
                        </dl>
                        <dl className="db dib-ns w-auto-ns lh-title">
                            <dd className="f6 fw4 ml0">Latitude</dd>
                            <dd className="f2 f-subheadline-ns fw6 ml0">{image.metadata.location.point.Y.toFixed(3)}</dd>
                        </dl>
                    </div>
                </article> : null}
        </div>
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export {
    ImageContainer
};
