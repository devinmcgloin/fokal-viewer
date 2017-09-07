import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const TagCard = ({id, image}) =>
    <div className="sans-serif">
        <div className="br2 shadow-5"
             style={{background: '#3C3C3C'}}>
            <Link to={"/t/" + id}>
                <img
                    src={image.src_links.medium}
                    alt=""
                    // className="mb7"
                    style={{borderRadius: '4px 4px 0 0'}}
                />
            </Link>
            <div className="fw1 pa3">
                <div>
                    <p className="f7 ttu tracked white-50">Tag</p>
                    <span className="tc f5 fw2 white">{id}</span>
                </div>
            </div>

        </div>
    </div>;

TagCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.shape({
        src_links : PropTypes.object.isRequired,
    })
};

export {TagCard}