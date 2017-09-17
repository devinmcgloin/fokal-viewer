import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const TagCard = ({image, count, id}) =>
    <div className={"sans-serif"}>
        <Link to={"/t/" + id}>
            <div className={"aspect-ratio aspect-ratio--16x9"}>
                <div
                    alt="" className="db bg-center cover aspect-ratio--object br2 shadow-5"
                    style={{backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0) 60%), url(' + image.src_links.medium + ')'}}
                >

                    <div className="fw1 pa4">
                        <div>
                            <p className="f6 fw2 white-80 ma0">{count} {count === 1 ? 'Image' : 'Images'}</p>
                            <p className="f2 fw4 white ma0">{id}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    </div>;

TagCard.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.shape({src_links: PropTypes.object.isRequired}),
    count: PropTypes.number.isRequired
};

export {TagCard};
