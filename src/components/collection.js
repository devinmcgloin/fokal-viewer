import React from 'react'
import {ImageCard} from './cards/image/image'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Masonry from 'react-masonry-component';

const LinearCollection = ({images, isSummary}) => {
    const rend = images.map((img) =>
        <ImageCard key={img.id} image={img} isSummary={isSummary}/>
    );

    return (
        <div>
            {rend}
        </div>
    );
};

LinearCollection.propTypes = {
    images: PropTypes.array.isRequired,
    isSummary: PropTypes.bool.isRequired,
};

function* GridGenerator() {
    let indx = 0;
    let seq = [
        'fl w-100 w-third-ns pa2',
        'fl w-100 w-third-ns pa2',
        'fl w-100 w-third-ns pa2',
        'fl w-100 w-third-ns pa2',

        //
        // 'fl w-100 w-50-ns pa2',
        // 'fl w-100 w-50-ns pa2',
        //
        // 'fl w-100 w-two-thirds pa2',
        //
        // 'fl w-100 w-75-ns pa2',
        // 'fl w-100 w-25-ns pa2',
    ];
    while (true) {
        yield seq[indx];
        indx++;
        indx %= seq.length;
    }
}

const GridCollection = ({headerCards, images}) => {

    let gen = GridGenerator();
    const rend = images.map((img) =>
        <div className={'grid-item ' + gen.next().value} key={img.id}>

            <Link to={'/i/' + img.id}>
                <img
                    alt=""
                    src={img.src_links.medium}
                    className="bg-center cover br2 shadow-5"
                    // style={{background: 'url('+img.src_links.small+')'}}
                />
            </Link>
        </div>
    );

    let opts = {
        transitionDuration: 0,
        percentPosition: true,
        itemSelector: '.grid-item',
        columnWidth: '.w-third',
    };

    let titleBox = [<div key="width" className="w-third"/>];
    if (headerCards)
        titleBox = titleBox.concat(headerCards.map(card =>
            <div key={card.id} className="grid-item fl w-100 w-third-ns pa2">
                {card}
            </div>
        ));

    return (
        <Masonry options={opts} updateOnEachImageLoad={true}>
            {titleBox.concat(rend)}
        </Masonry>
    )

};

GridCollection.propTypes = {
    images: PropTypes.array.isRequired,
    headerCards: PropTypes.arrayOf(PropTypes.node).required
};

GridCollection.defaultProps = {
    images: [],
    headerCards: []
};

export {LinearCollection, GridCollection};