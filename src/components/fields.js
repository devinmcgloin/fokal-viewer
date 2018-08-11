import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ handleChange, name, val, desc, optional, presentation_name, readOnly }) => (
    <div className="w-100">
        <label htmlFor={name} className="f6 b db mb2 ttc">
            {presentation_name || name}
            {optional ? <span className="normal black-60">(optional)</span> : null}
        </label>
        <textarea
            id={name}
            name={name}
            className={
                'db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2 ' +
                (readOnly && 'bg-gray-70')
            }
            aria-describedby={name + '-desc'}
            value={val}
            onChange={handleChange}
            readOnly={readOnly}
        />
        <small id={name + '-desc'} className="f6 black-60">
            {desc}
        </small>
    </div>
);

TextArea.propTypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    presentation_name: PropTypes.string,
    val: PropTypes.any.isRequired,
    desc: PropTypes.string.isRequired,
    optional: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool
};

const TextField = ({ handleChange, name, val, desc, optional, presentation_name, readOnly }) => (
    <div className="measure w-100">
        <label htmlFor={name} className="f6 b db mb2 ttc">
            {presentation_name || name}
            {optional ? <span className="normal black-60">(optional)</span> : null}
        </label>
        <input
            id={name}
            className={
                'input-reset ba b--black-20 pa2 br2 mb2 db w-100 ' + (readOnly && 'bg-gray-50')
            }
            type="text"
            name={name}
            aria-describedby={name + '-desc'}
            value={val}
            onChange={handleChange}
            readOnly={readOnly}
        />
        <small id={name + '-desc'} className="f6 black-60 db mb2">
            {desc}
        </small>
    </div>
);

TextField.propTypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    presentation_name: PropTypes.string,
    val: PropTypes.any.isRequired,
    desc: PropTypes.string.isRequired,
    optional: PropTypes.bool.isRequired,
    readOnly: PropTypes.bool
};

export { TextArea, TextField };
