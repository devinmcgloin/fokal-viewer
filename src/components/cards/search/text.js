import React from 'react'
import PropTypes from 'prop-types'
import ReactTags from 'react-tag-input'

const TextSearchCard = ({q, handleQueryChange, handleSubmit, handleToggleChange, background}) =>
    <div className="pa4 ba" style={{background: background}}>
        <h1 className="f4 f2-l fw7 mt0 pv3 bb near-white b--near-white ">Search</h1>
        <p className="lh-copy mt2 tc mt3-m mt5-l f6 near-white">
            <div className="list pa1 tc">
                <div className="sans-serif mw7 pa5 ma2 tc br2 center bg-lightest-blue ba b--light-blue">
                    <input
                        className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                        type="text"
                        onChange={handleQueryChange}/>
                    <span onClick={handleSubmit}
                          className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns">
                                Search
                    </span>
                </div>

                <div>
                    <div>Advanced</div>
                    <div>Geo</div>
                    <div>Color</div>
                    <div>User</div>
                </div>
            </div>
        </p>
    </div>;

TextSearchCard.propTypes = {
    q: PropTypes.string,
    handleQueryChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleToggleChange: PropTypes.func,
    background: PropTypes.string,
};

const TagSearchCard = ({background, suggestions, opt, req, exc, handleAddition, handleDeletion}) =>
    <div className="pa4 ba" style={{background: background}}>
        <h1 className="f4 f2-l fw7 mt0 pv3 bb near-white b--near-white ">Tags</h1>
        <p className="lh-copy mt2 tc mt3-m mt5-l f6 near-white">
            <div className="list pa1 tc">
                <ReactTags tags={opt} suggestions={suggestions} handleDelete={(i) => handleDeletion("opt", i)}
                           handleAddition={(t) => handleAddition("opt", t)}/>
                <ReactTags tags={req} suggestions={suggestions} handleDelete={(i) => handleDeletion("req", i)}
                           handleAddition={(t) => handleAddition("req", t)}/>
                <ReactTags tags={exc} suggestions={suggestions} handleDelete={(i) => handleDeletion("exc", i)}
                           handleAddition={(t) => handleAddition("exc", t)}/>
            </div>
        </p>
    </div>;

TagSearchCard.propTypes = {
    background: PropTypes.string,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    opt: PropTypes.arrayOf(PropTypes.shape({
        indx: PropTypes.number,
        id: PropTypes.string,
    })),
    req: PropTypes.arrayOf(PropTypes.shape({
        indx: PropTypes.number,
        id: PropTypes.string,
    })),
    exc: PropTypes.arrayOf(PropTypes.shape({
        indx: PropTypes.number,
        id: PropTypes.string,
    })),
    handleAddition: PropTypes.func,
    handleDeletion: PropTypes.func,
};

export {TextSearchCard, TagSearchCard}