import React from 'react';
import {Link} from 'react-router-dom';
import {Colors} from './color';
import PropTypes from 'prop-types';
import {MetadataViewer} from './metadata'

const Image = (props) => {

    const userLink = {
        textAlign: 'center',
        fontFamily: ['Montserrat', 'sans-serif'],
        display: 'block',
        padding: '0 1rem 1rem 1rem',
        color: '#5f5f5f',
        textDecoration: "underline"
    };

    let url = props.image.permalink.split("/");
    let shortcode = url[url.length - 1];

    return (
        <div>
            <Link to={"/i/" + shortcode}>
                <img className="image"
                     src={props.image.src_url.small}
                     alt=""
                     style={{marginTop: '1rem'}}/>
            </Link>
            <Colors colors={props.image.colors}/>
            <MetadataViewer {...props.image.metadata}/>
            <Link
                to={props.image.user.permalink}
                style={userLink}>{props.image.user.name}</Link>
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
        }),
        user: PropTypes.shape({
            permalink: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    })

};


export {Image};
