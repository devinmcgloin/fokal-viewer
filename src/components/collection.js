import React from 'react'
import {Image} from './image'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Loading} from './loading'
import FontAwesome from 'react-fontawesome'

const Collection = ({title, images, isLoading, isGrid, summary, handleChange}) => {
        let rend;
        if (isGrid) {
            rend = images.map((img) =>
                <div className="fl w-50 w-third-m w-25-ns" key={img.permalink}>
                    <div className="aspect-ratio aspect-ratio--9x16">
                        <Link to={img.permalink}>
                            <img style={{backgroundImage: 'url(' + img.src_url.medium + ')'}}
                                 className="db bg-center cover aspect-ratio--object"/>
                        </Link>
                    </div>
                </div>
            );
        }
        else {
            rend = images.map((img) =>
                <Image key={img.permalink} image={img} summary={summary}/>
            );
        }

        const imagesContainer = isGrid ? <main className="cf w-100 columns is-desktop is-multiline">
            {rend}
        </main> : <div>
            {rend}
        </div>;

        return (
            <div className="sans-serif">
                {title ?
                    <h1 className="tc" style={{textTransform: 'capitalize'}}>{title}</h1> : null}

                <section className="pa1 inline-flex">
                    <span className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                          onClick={() => handleChange("featured")}>Featured</span>
                    <span className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                          onClick={() => handleChange("trending")}>Trending</span>
                    <span className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                          onClick={() => handleChange("recent")}>Recent</span>
                    <FontAwesome className="f5 link hover-dark-blue b no-underline black dib ph2 pv1 pointer"
                                 name="th-large"/>
                </section>

                {isLoading ? <Loading/> :
                    imagesContainer}

            </div>
        )
    }


;


Collection.propTypes = {
    title: PropTypes.string,
    images: PropTypes.array.isRequired,
    isGrid: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    summary: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired
};


export {Collection};