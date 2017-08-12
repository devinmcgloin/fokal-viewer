import React from 'react'
import {Image} from './image'
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading';
import {Link} from 'react-router-dom'

const Collection = ({title, images, isLoading, isGrid, summary}) => {
    if (isLoading) {
        return (
            <div>
                <ReactLoading type='cubes' color='#000000' height={100} width={100}/>
            </div>
        )
    }
    else {
        if (isGrid) {
            const rend = images.map((img) =>
                <div className="fl w-50 w-third-m w-25-ns" key={img.permalink}>
                    <div className="aspect-ratio aspect-ratio--9x16">
                        <Link to={img.permalink}>
                        <img style={{backgroundImage: 'url(' + img.src_url.medium +')'}}
                             className="db bg-center cover aspect-ratio--object"/>
                        </Link>
                    </div>
                </div>
            );

            return (
                <main className="cf w-100">
                    {rend}
                </main>
            )
        }
        else {
            const renderedImages = images.map((img) =>
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