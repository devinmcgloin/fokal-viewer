import React from 'react'
import {Image} from './image'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const LinearCollection = ({images, isSummary}) => {
        const rend = images.map((img) =>
            <Image key={img.id} image={img} isSummary={isSummary}/>
        );

        return (
            <div>
                {rend}
            </div>
        );
    }


;

LinearCollection.propTypes = {
    images: PropTypes.array.isRequired,
    isSummary: PropTypes.bool.isRequired,
};

const GridCollection = ({images}) => {
    const rend = images.map((img) =>
        <div className="fl w-50 w-third-m w-25-ns" key={img.id}>
            <div className="aspect-ratio aspect-ratio--9x16">
                <Link to={'/i/'+img.id}>
                    <img style={{backgroundImage: 'url(' + img.src_url.medium + ')'}}
                         className="db bg-center cover aspect-ratio--object"/>
                </Link>
            </div>
        </div>
    );


    return (
        <main className="cf w-100 columns is-desktop is-multiline">
            {rend}
        </main>
    )

};

GridCollection.propTypes = {
    images: PropTypes.array.isRequired,
};

export {LinearCollection, GridCollection};