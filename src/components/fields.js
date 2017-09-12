import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({handleChange, name, val, desc, optional, presentation_name}) =>
    <div>
        <label htmlFor={name} className="f6 b db mb2 ttc">{presentation_name || name} {optional ?
            <span className="normal black-60">(optional)</span> : null}</label>
        <textarea id={name} name={name} className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                  aria-describedby="comment-desc" value={val} onChange={handleChange}/>
        <small id="comment-desc" className="f6 black-60">{desc}</small>
    </div>;

TextArea.propTypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    presentation_name: PropTypes.string,
    val: PropTypes.any.isRequired,
    desc: PropTypes.string.isRequired,
    optional: PropTypes.bool.isRequired,
};

const TextField = ({handleChange, name, val, desc, optional, presentation_name}) =>
    <div className="measure">
        <label htmlFor={name} className="f6 b db mb2 ttc">{presentation_name || name} {optional ?
            <span className="normal black-60">(optional)</span> : null}</label>
        <input id={name} className="input-reset ba b--black-20 pa2 br2 mb2 db w-100" type="text" name={name}
               aria-describedby={name + '-desc'} value={val} onChange={handleChange}/>
        <small id={name + '-desc'} className="f6 black-60 db mb2">{desc}</small>
    </div>;

TextField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    presentation_name: PropTypes.string,
    val: PropTypes.any.isRequired,
    desc: PropTypes.string.isRequired,
    optional: PropTypes.bool.isRequired,
};

export {TextArea, TextField}