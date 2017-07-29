import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


const ColorDisplay = (props) => {
    const style = {
        background: '#' + props.hex,
        flexGrow: props.pixel_fraction,
        display: 'block',
        float: 'left',
        padding: '10px'
    };
    return (
        <div style={style}>
            #{props.hex}
        </div>
    );
};


ColorDisplay.propTypes = {
    hex: PropTypes.string.isRequired,
    pixel_fraction: PropTypes.number.isRequired
};

const Colors = (props) => {
    const clrs = props.colors.map((clr,i) => {
        return <ColorDisplay key={i} hex={clr.Hex} pixel_fraction={clr.pixel_fraction}/>
    });

    const container = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    };

    return (
        <div style={container}>
            {clrs}
        </div>
    );
};

Colors.propTypes = {
    colors: PropTypes.array.isRequired
};


export {ColorDisplay, Colors};
