import React from 'react';
import {Link} from 'react-router-dom';
import {Colors} from './color';
import PropTypes from 'prop-types';
import {MetadataViewer} from './metadata'
import {Loading} from './loading'

const Tags = ({tags}) => {
    const rend = tags.map((t) =>
        <li className="dib mr1 mb2" key={t}><Link to={"/t/"+t} className="f6 f5-ns b db pa2 link dim dark-gray ba b--black-20">{t}</Link></li>
    );
    return (
        <ul className="sans-serif list ph3 ph5-ns pv4">
            {rend}
        </ul>
    );
    };

Tags.propTypes = {
    tags: PropTypes.array
};

const Image = ({image, isSummary, isLoading}) => {
    if (isLoading) {
        return <Loading/>
    }

    let url = image.permalink.split("/");
    let shortcode = url[url.length - 1];

    return (
        <div>
            {image.tags.length !== 0 ? <Tags tags={image.tags}/> : null}
            <Link to={"/i/" + shortcode}>
                <img className="image"
                     src={image.src_url.large}
                     alt=""
                     style={{marginTop: '1rem'}}/>
            </Link>
            {!isSummary ? <Colors colors={image.colors}/> : null}
            <MetadataViewer user={image.user} metadata={image.metadata} stats={image.stats}/>
        </div>
    );
};

Image.propTypes = {
    image: PropTypes.shape({
        src_url: PropTypes.object,
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
    }),
    isSummary: PropTypes.bool,
    isLoading: PropTypes.bool
};


export {Image};
