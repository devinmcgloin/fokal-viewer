import React from 'react';
import {Link} from 'react-router-dom';
import {Colors} from './color';
import PropTypes from 'prop-types';
import {MetadataViewer} from './metadata'
const Image = (props) => {
    const imgStyle = {
        margin: 'auto',
        display: 'block',
        padding: '1rem',
        width: '90%',
        paddingBottom: '3px'
    };

    let url = props.image.permalink.split("/");
    let shortcode = url[url.length-1];

    return (
        <div>
            <Link to={"/i/"+shortcode}>
                <img style={imgStyle} src={props.image.src_url.small}/>
            </Link>
            <Colors colors={props.image.colors}/>
            <MetadataViewer {...props.image.metadata}/>
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
            })
        })
    })

};


export {Image};
