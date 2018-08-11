import React, { Component } from 'react';
import { ImageCard } from '../components/cards/image';
import { GridCollection } from '../components/collection';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Search } from '../services/api/search';
import { Loading } from '../components/loading';

class SearchDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            loading: true
        };
    }

    componentDidMount() {
        const t = this;
        Search('/search', {
            required_terms: t.props.search,
            document_types: ['image', 'tag']
        }).then(data => {
            if (data.ok)
                data.body.then(d =>
                    t.setState({
                        images: d.images,
                        tags: d.tags,
                        loading: false,
                        failed: false
                    })
                );
            else t.setState({ failed: true, loading: false });
        });
    }

    render() {
        return (
            <div className={'pv3'}>
                <h2 className={'f2 measure lh-copy'}>{this.props.title}</h2>
                <p className={'measure-wide lh-copy'}>{this.props.description}</p>
                <p className={'measure-wide lh-copy'}>
                    <Link
                        to={'/search?q=' + this.props.search}
                        className={'link dim hover black underline'}
                    >
                        Explore More
                    </Link>
                </p>
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <GridCollection
                        cards={this.state.images.slice(0, 3).map(i => (
                            <ImageCard key={i.id} image={i} />
                        ))}
                    />
                )}
            </div>
        );
    }
}

SearchDisplay.propTypes = {
    title: PropTypes.string,
    search: PropTypes.string,
    description: PropTypes.string
};

class FeaturedScene extends Component {
    render() {
        return (
            <div className="pa3 pa4-ns sans-serif">
                <h1 className={' f3 f1-m f-headline-l measure lh-copy'}>Featured</h1>
                <p className={'measure lh-copy'}>
                    View the popular searches and locations on Fokal and find new images.
                </p>

                <SearchDisplay
                    title={'Mountains'}
                    description={'Explore images from iconic mountain ranges around the world.'}
                    search={['mountains']}
                />

                <SearchDisplay
                    title={'Architecture'}
                    description={'Find beautiful structures from all corners of the globe.'}
                    search={['architecture']}
                />

                <SearchDisplay
                    title={'Mountains in Canada'}
                    description={'Mountains from the great country of Canada.'}
                    search={['mountains', 'in', 'canada']}
                />
            </div>
        );
    }
}

export { FeaturedScene };
