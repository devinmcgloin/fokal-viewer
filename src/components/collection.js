import React from 'react'
import {Image} from './image'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading';


const Collection = ({title, images, isLoading, isGrid, summary}) => {
    if (isLoading) {
        return (
            <div>
                <ReactLoading type='cubes' color='#000000' height={100} width={100}/>
            </div>
        )
    }
    else {
        const renderedImages = images.map((img) =>
            isGrid ?
                <div key={img.permalink} className="column is-half"><Image key={img.permalink} image={img}/></div> :
                <Image key={img.permalink} image={img} summary={summary}/>
        );

        return (
            <div>
                {title ?
                    <h1 className="sans-serif tc">{title}</h1> : null}
                <div className={isGrid ? "columns is-desktop is-multiline" : ""}>
                    {renderedImages}
                </div>
            </div>
        )
    }
};


Collection.propTypes = {
    title: PropTypes.string,
    images: PropTypes.array.isRequired,
    isGrid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    summary: PropTypes.bool.isRequired,
};


export {Collection};