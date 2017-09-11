import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {Image} from "../../image";


const ImageCardFull = ({image}) => {
    let id = image.id,
        meta = image.metadata,
        user = image.user;
    return (
        <div className="mv4 sans-serif">
            <div className="br4 shadow-5"
                 style={{background: '#3C3C3C'}}>
                <Link to={"/i/" + id}>
                    <Image pixel_xd={image.metadata.pixel_xd}
                           pixel_yd={image.metadata.pixel_yd}
                           url={image.src_links.large}
                           style={{borderRadius: '4px 4px 0 0'}}/>
                </Link>
                <div className="fw1 pv3 ph4 flex flex-row-ns flex-column justify-between ph3">
                    <div className="fl w-100 w-33-ns">
                        {image.title ?
                            <div>
                                <p className="f7 ttu tracked white-50">Title</p>
                                <span className="f5 fw2 white">{image.title}</span>
                            </div> : null}
                        <p className="f7 ttu tracked white-50">Photographer</p>
                        <Link to={"/u/" + user.id} className="link dim no-underline">
                            <span className="f5 fw2 white ">{user.name}</span>
                        </Link>
                        {meta.location && meta.location.point ?
                            <div>
                                <div>
                                    <p className="f7 ttu tracked white-50">lat</p>
                                    <span
                                        className="f5 fw2 white">{meta.location.point.Y.toFixed(8)}</span>
                                </div>
                                <div>
                                    <p className="f7 ttu tracked white-50">lng</p>
                                    <span
                                        className="f5 fw2 white">{meta.location.point.X.toFixed(8)}</span>
                                </div>
                            </div>
                            : null}
                    </div>

                    <div className="fl w-100 w-33-ns">
                        <p className="f7 ttu tracked white-50">Metadata</p>
                        <article className="cf f5 fw2 white">
                            <div className="fl w-50">
                                <span><span className="white-50">f/</span>{meta.aperture}</span>
                            </div>
                            <div className="fl w-50">
                                <span>{meta.focal_length}<span className="white-50">mm</span></span>
                            </div>
                        </article>
                        <article className="cf f5 fw2 white">
                            <div className="fl w-50">
                                <span><span className="white-50">ISO </span>{meta.iso}</span>
                            </div>
                            <div className="fl w-50">
                                <span>{meta.exposure_time}<span className="white-50">s</span></span>
                            </div>
                        </article>
                        <p className="f7 ttu tracked white-50">Colors</p>
                        <div>
                            {image.colors.map((clr) =>
                                <div key={clr.hex} className="fl pa3 br-100 ma1 ba b--white-50"
                                     style={{background: '#' + clr.hex}}>
                                </div>)}

                        </div>
                    </div>
                    <div className="fl w-100 w-33-ns">
                        <p className="f7 ttu tracked white-50">Tags</p>
                        <div className="list">
                            {image.tags.map((t) =>
                                <Link key={t} to={"/t/" + t}>
                                    <div className="dib mr2 mb2 f5 fw2 white br1 ba b--white-50 pa1">{t}</div>
                                </Link>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ImageCardFull.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src_links: PropTypes.object,
        colors: PropTypes.array.isRequired,
        permalink: PropTypes.string.isRequired,
        metadata: PropTypes.shape({
            location: PropTypes.shape({
                X: PropTypes.number,
                Y: PropTypes.number,
            }),
            capture_time: PropTypes.string,
        }),
        user: PropTypes.shape({
            permalink: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    }).isRequired,
};

const ImageCardSmall = ({image}) =>
    <div>
        <Link to={'/i/' + image.id}>
            <Image pixel_xd={image.metadata.pixel_xd} pixel_yd={image.metadata.pixel_yd} url={image.src_links.medium} className="bg-center cover br2 shadow-5"/>
        </Link>
    </div>;

ImageCardSmall.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.string.isRequired,
        src_links: PropTypes.object,
        colors: PropTypes.array.isRequired,
        permalink: PropTypes.string.isRequired,
        metadata: PropTypes.shape({
            location: PropTypes.shape({
                X: PropTypes.number,
                Y: PropTypes.number,
            }),
            capture_time: PropTypes.string,
        }),
        user: PropTypes.shape({
            permalink: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    }).isRequired,
};

export {ImageCardFull, ImageCardSmall};