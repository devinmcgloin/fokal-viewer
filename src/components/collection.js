import React from 'react'
import { ImageCardFull} from './cards/image/image'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component';

const LinearCollection = ({images}) => {
    const rend = images.map((img) =>
        <ImageCardFull key={img.id} image={img} />
    );

    return (
        <div>
            {rend}
        </div>
    );
};

LinearCollection.propTypes = {
    images: PropTypes.array.isRequired,
};

const GridCollection = ({cards}) => {
    let opts = {
        transitionDuration: 0,
        percentPosition: true,
        itemSelector: '.grid-item',
    };

    let titleBox = [<div key="width" className="w-100 w-50-m w-third-l"/>];

    titleBox = titleBox.concat(cards.map(card =>
        <div key={card.key} className="grid-item fl w-100 w-50-m w-third-l pa2">
            {card}
        </div>
    ));

    return (
        <Masonry options={opts} updateOnEachImageLoad={true}>
            {titleBox}
        </Masonry>
    )

};

GridCollection.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.element).required
};

GridCollection.defaultProps = {
    cards: []
};

export {LinearCollection, GridCollection};