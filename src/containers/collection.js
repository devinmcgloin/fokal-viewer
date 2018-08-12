import React, { Component } from 'react';
import { FetchImages } from '../services/api/retrieval';
import { GridCollection, LinearCollection } from '../components/collection';
import { bindAll } from 'lodash';
import { Loading } from '../components/loading';
import PropTypes from 'prop-types';
import Raven from 'raven-js';
import { Error } from '../components/error';
import { ImageCard } from '../components/cards/image';
import { Controls } from '../components/collectionControls';
import { Redirect, Route, Switch } from 'react-router-dom';

class ImageCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      type: this.props.match.params.type || 'featured',
      isGrid: true,
      failed: false,
      isLoading: true
    };

    bindAll(this, 'handleChange', 'handleLayoutChange');
  }

  loadImageFromServer(type) {
    let t = this;
    FetchImages('/images/' + type).then(function(data) {
      switch (data.ok) {
        case true:
          data.body.then(b => t.setState({ [type]: b, isLoading: false }));
          break;
        default:
          t.setState({
            isLoading: false,
            failed: true
          });
          Raven.captureException(new Error('Invalid Response code from server.'), {
            code: data.code
          });
      }
    });
  }

  handleChange(type) {
    this.setState({
      type: type,
      isLoading: true
    });
    this.loadImageFromServer(type);
  }

  handleLayoutChange(e) {
    this.setState(prevState => ({ isGrid: !prevState.isGrid }));
  }

  componentDidMount() {
    this.loadImageFromServer(this.state.type);
  }

  render() {
    let content = null;
    if (this.state.isLoading) content = <Loading />;
    else if (this.state.failed) content = <Error />;

    const controllerOptions = [
      { link: '/', tag: 'featured' },
      { link: '/recent', tag: 'recent' },
      {
        link: '/trending',
        tag: 'trending'
      }
    ];

    return (
      <div className="sans-serif ph3 ph4-ns pv3">
        <Controls
          options={controllerOptions}
          selected={this.state.type}
          layout={this.state.isGrid ? 'grid' : 'inline'}
          handleLayoutChange={l => this.setState({ isGrid: l === 'grid' })}
          handleTypeChange={t => this.handleChange(t)}
        />
        {content ? (
          content
        ) : (
          <Switch>
            <Route
              path={'/recent'}
              render={() =>
                this.state.isGrid ? (
                  <GridCollection
                    cards={this.state.recent.map(i => (
                      <ImageCard key={i.id} image={i} />
                    ))}
                  />
                ) : (
                  <LinearCollection images={this.state.recent} />
                )
              }
            />
            <Route
              path={'/trending'}
              render={() =>
                this.state.isGrid ? (
                  <GridCollection
                    cards={this.state.trending.map(i => (
                      <ImageCard key={i.id} image={i} />
                    ))}
                  />
                ) : (
                  <LinearCollection images={this.state.trending} />
                )
              }
            />

            <Route
              exact
              path={'/'}
              render={() =>
                this.state.isGrid ? (
                  <GridCollection
                    cards={this.state.featured.map(i => (
                      <ImageCard key={i.id} image={i} />
                    ))}
                  />
                ) : (
                  <LinearCollection images={this.state.featured} />
                )
              }
            />
          </Switch>
        )}
      </div>
    );
  }
}

ImageCollection.propTypes = {
  match: PropTypes.object
};

class TaggedImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      tag: props.match.params.id,
      isLoading: true,
      failed: false,
      not_found: false,
      count: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tag: nextProps.match.params.id, images: [] });
    this.loadImageFromServer(nextProps.match.params.id);
  }

  loadImageFromServer(tag) {
    let t = this;
    FetchImages('/tags/' + tag).then(function(data) {
      switch (data.ok) {
        case true:
          data.body.then(b =>
            t.setState({
              images: b.images,
              count: b.count,
              isLoading: false
            })
          );
          break;
        default:
          data.status === 404
            ? t.setState({
                isLoading: false,
                not_found: true
              })
            : t.setState({
                isLoading: false,
                failed: true
              });
          Raven.captureException(new Error('Invalid Response code from server.'), {
            code: data.code
          });
      }
    });
  }

  componentDidMount() {
    this.loadImageFromServer(this.state.tag);
  }

  render() {
    let content;
    if (this.state.isLoading) content = <Loading />;
    else if (this.state.failed) content = <Error />;
    else if (this.state.not_found) content = <Redirect to={'/404'} />;
    else
      content = (
        <GridCollection
          cards={this.state.images.map(i => (
            <ImageCard key={i.id} image={i} />
          ))}
        />
      );

    return (
      <div className="sans-serif pa3 pa4-ns">
        <h1 className="tc f1" style={{ textTransform: 'lowercase' }}>
          #{this.state.tag}
        </h1>
        {content}
      </div>
    );
  }
}

TaggedImages.propTypes = {
  match: PropTypes.object
};

export { ImageCollection, TaggedImages };
