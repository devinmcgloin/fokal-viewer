import React from 'react'
import {Image} from './image'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Masonry from 'react-masonry-component';
import FontAwesome from 'react-fontawesome'

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

const GridCollection = ({title, images}) => {

    let gen = GridGenerator();
    const rend = images.map((img) =>
        <div className={'grid-item ' + gen.next().value} key={img.id}>

            <Link to={'/i/' + img.id}>
                <img src={img.src_links.medium}
                     className="bg-center cover"
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
    if (title)
        titleBox.push(
            <div key="title" className="grid-item sans-serif fl w-100 w-two-thirds-ns pa2">
                {title}
            </div>
        );

    return (
        <Masonry options={opts}>
            {titleBox.concat(rend)}
        </Masonry>
    )

};

GridCollection.propTypes = {
    images: PropTypes.array.isRequired,
};


const Template = () =>
    <div>
        <div className="fl w-50 pr2 pr3-l mb3 mb4-l">
            <div className="cover pv5 pv6-m pv7-l"
                 style={{background: "black url(http://mrmrs.github.io/photos/v/022.jpg) center"}}></div>
        </div>
        <div className="fl w-50 w-25-l pl2 pr2-m ph2-l mb3 mb4-l">
            <div className="cover pv5 pv6-m pv7-l"
                 style={{background: "black url(http://mrmrs.github.io/photos/v/024.jpg) center"}}></div>
        </div>
        <div className="fl w-50 w-50 w-25-l pr2 pr0-l pl3-l mb3 mb4-l">
            <div className="cover pv5 pv6-m pv7-l"
                 style={{background: "black url(http://mrmrs.github.io/photos/050.jpg) left"}}></div>
        </div>
        <div className="fl w-50 w-50 w-25-l pl2 pl0-l pr2-m pr4-l mb3 mb4-l">
            <div className="cover pv5 pv6-m pv7-l"
                 style={{background: "black url(http://mrmrs.github.io/photos/049.jpg) center"}}></div>
        </div>
        <div className="fl w-100 w-50-l pr2-l pl2-ns mb4 mb0-l mb4 outline">
            <div className="pa4">
                <h1 className="f4 f2-l fw7 mt0 pv3-l bb-l bb--black">#004</h1>
                <p className="lh-copy mt2 mt3-m mt5-l f6">
                    <span className="db-ns f6 fw7 lh-solid mb3 mb0-m mb4-l">Mies, my great mentor said:</span>
                    <span className="fw9 f6 f1-l db lh-title mb3 mb4-l">“God is in the details.”</span>
                    <span className="db-l measure-wide">
          That is the essence of syntax: the discipline
          that controls the proper use of grammar in the construction of phrases and the articulation of a language, Design. The syntax of design is provided by many components in the nature of the project.
        </span>
                </p>
            </div>
        </div>
        <div className="cf">
            <div className="fl w-100 w-25-l pl3-l mb3 mb4-l">
                <div className="cover pv5 pv6-m pv7-l"
                     style={{background: "black url(http://mrmrs.github.io/photos/051.jpg) center"}}></div>
            </div>

            <div className="fl w-100 mb2 mb4-l">
                <div className="cover pv5 pv6-l"
                     style={{background: "black url(http://mrmrs.github.io/photos/u/001.jpg) center"}}></div>
            </div>
            <div className="fl w-25 mb2 mb4-l">
                <div className="cover pv5 pv6-m pv7-l"
                     style={{background: "black url(http://mrmrs.github.io/photos/u/002.jpg) center"}}></div>
            </div>
            <div className="fl w-75 pl2 pl4-l mb2 mb4-l">
                <div className="cover pv5 pv6-m pv7-l"
                     style={{background: "black url(http://mrmrs.github.io/photos/u/003.jpg) center"}}></div>
            </div>
            <div className="fl w-100 mb2 mb4-l">
                <div className="cover pv5 pv6-ns"
                     style={{background: "black url(http://mrmrs.github.io/photos/u/004.jpg) center"}}></div>
            </div>
        </div>
    </div>;

export {LinearCollection, GridCollection};