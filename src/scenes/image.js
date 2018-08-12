import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FetchImage } from '../services/api/retrieval';
import { GetUser } from '../services/store/auth';
import { Loading } from '../components/loading';
import { NotFound } from '../components/error';
import { Download, Favorite } from '../components/buttons/social';
import { User } from '../components/image/user';
import { ContainedImage } from '../components/image';
import MetadataButton from '../components/buttons/metadata';
import LocationButton from '../components/buttons/location';

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      stats: {},
      id: props.match.params.id,
      isLoading: true,
      failed: false,
      favoritedByUser: false
    };
  }

  loadImageFromServer() {
    let t = this;
    FetchImage(this.state.id).then(data => {
      if (data.ok)
        data.body.then(b => {
          t.setState({
            image: b,
            stats: b.stats,
            isLoading: false
          });
        });
      else t.setState({ isLoading: false, failed: true });
    });
  }

  componentDidMount() {
    this.loadImageFromServer();
  }

  render() {
    if (this.state.isLoading) return <Loading />;
    else if (this.state.failed) return <NotFound />;

    const image = this.state.image;
    const stats = this.state.stats;
    const username = GetUser();
    const favorited = image.favorited_by.reduce(
      (acc, user) => (acc ? acc : user.includes(username)),
      false
    );

    return (
      <div>
        {/* <Header image={this.state.image} /> */}
        <div className="ph3 ph5-ns mw9 center flex justify-between items-center pa2">
          <div>
            <User {...image.user} />
          </div>
          <div>
            <Favorite id={image.id} favorited={favorited} count={stats.favorites} />
            <Download
              id={image.id}
              imageURL={image.src_links.raw}
              count={stats.downloads}
              increment={() => {
                this.setState(prev => {
                  let stats = prev.image.stats;
                  stats['downloads'] += 1;
                  return { stats: stats };
                });
              }}
            />
          </div>
        </div>
        <ContainedImage url={image.src_links.raw} dimensions={image.metadata} />
        <div className="ph3 ph5-ns mw9 center flex justify-between pa2">
          <LocationButton />
          <MetadataButton />
        </div>
      </div>
    );
  }
}

ImageContainer.propTypes = {
  match: PropTypes.object
};

export { ImageContainer };
