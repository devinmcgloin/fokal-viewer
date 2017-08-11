import React from 'react'
import {Image} from './image'
import PropTypes from 'prop-types'

function Collection({title, images, isLoading, isGrid, summary}) {
    const renderedImages = images.map((img) =>
        this.state.isGrid ?
            <div key={img.permalink} className="column is-half"><Image key={img.permalink} image={img}/></div> :
            <Image key={img.permalink} image={img}/>
    );

    return (
        <div>
            {title ?
                <h1 className="title" style={{textAlign: 'center', padding: '1rem'}}>{title}</h1> : null}
            <div className={isGrid ? "columns is-desktop is-multiline" : ""}>
                {renderedImages}
            </div>
        </div>
    )
}

Collection.PropTypes = {
    title: PropTypes.string,
    images: PropTypes.shape({}),
    isGrid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    summary: PropTypes.bool.isRequired,

};


export {Collection};