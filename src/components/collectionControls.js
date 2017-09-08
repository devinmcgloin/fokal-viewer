import React from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

const Controls = ({options, selected, layout, handleLayoutChange, handleTypeChange}) => {
    const control = options.map(o => <span key={o}
                                           className={"fl f5 link dim b no-underline black-50 dib pr3 pointer ttc " +
                                           (o === selected ? "black" : "")}
                                           onClick={() => handleTypeChange(o)}>{o}</span>);

    return (
        <section className="pv1 w-100 h2 sans-serif">
            {control}

            <FontAwesome
                className={"fr f5 link dim b no-underline black-50 dib pl3 pointer " + (layout === 'inline' ? 'black' : '')}
                name={"align-justify"}
                onClick={() => handleLayoutChange('inline')}/>
            <FontAwesome
                className={"fr f5 link dim b no-underline black-50 dib pl3 pointer " + (layout === 'grid' ? 'black' : '')}
                name={"th-large"}
                onClick={() => handleLayoutChange('grid')}/>
        </section>
    )
};

Controls.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    handleLayoutChange: PropTypes.func.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
};

export {Controls};