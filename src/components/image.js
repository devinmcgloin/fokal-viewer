import React from 'react';
import {Link} from 'react-router-dom';
import {Colors} from './color';
import PropTypes from 'prop-types';


const Image = (props) => {
    const imgStyle = {
        margin: 'auto',
        display: 'block',
        padding: '1rem',
        width: '90%'
    };


    return (
        <div>
            <img style={imgStyle} src={props.image.src_url.small}/>
            <Colors colors={props.image.colors}/>
        </div>
    );
};

Image.propTypes = {
    image: PropTypes.shape({
        src_url: PropTypes.object,
        colors: PropTypes.array.isRequired
    })

};


export {Image};
