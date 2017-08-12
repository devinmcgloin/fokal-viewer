import React from 'react';
import {Link} from 'react-router-dom';
import {Colors} from './color';
import PropTypes from 'prop-types';
import {MetadataViewer} from './metadata'
import ReactLoading from 'react-loading'

const Image = ({image, isSummary, isLoading}) => {
    if (isLoading) {
        return (<ReactLoading type='cubes' color='#000000' height={100} width={100}/>)
    }
    const userLink = {
        textAlign: 'center',
        fontFamily: ['Montserrat', 'sans-serif'],
        display: 'block',
        padding: '0 1rem 1rem 1rem',
        color: '#5f5f5f',
        textDecoration: "underline"
    };

    let url = image.permalink.split("/");
    let shortcode = url[url.length - 1];

    return (
        <div>
            <Link to={"/i/" + shortcode}>
                <img className="image"
                     src={image.src_url.large}
                     alt=""
                     style={{marginTop: '1rem'}}/>
            </Link>
            {!isSummary ? <Colors colors={image.colors}/> : null}
            <div>
                <MetadataViewer {...image.metadata}/>
                <Link
                    to={image.user.permalink}
                    style={userLink}>{image.user.name}</Link>
            </div>
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
