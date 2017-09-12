import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Controls = ({options, selected, layout, handleLayoutChange, handleTypeChange}) => {
    const control = options.map(o =>
        <Link key={o.tag} to={o.link}>
        <span
            className={"fl f5 link dim b no-underline black-50 dib pr2 pr3-ns pointer ttc " +
            (o.tag === selected ? "black" : "")}
            onClick={() => handleTypeChange(o.tag)}>{o.tag}</span>
        </Link>);

    return (
        <section className="pv1 w-100 h2 sans-serif">
            {control}

            <FontAwesome
                className={"fr f5 link dim b no-underline black-50 dib pl2 pl3-ns pointer " + (layout === 'inline' ? 'black' : '')}
                name={"align-justify"}
                onClick={() => handleLayoutChange('inline')}/>
            <FontAwesome
                className={"fr f5 link dim b no-underline black-50 dib pl2 pl3-ns pointer " + (layout === 'grid' ? 'black' : '')}
                name={"th-large"}
                onClick={() => handleLayoutChange('grid')}/>
        </section>
    )
};

Controls.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    handleLayoutChange: PropTypes.func.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
};

export {Controls};