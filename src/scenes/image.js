import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FetchImage } from '../services/api/retrieval';
import { GetUser } from '../services/store/auth';
import { Loading } from '../components/loading';
import { NotFound } from '../components/error';
import { Download, Favorite } from '../components/buttons/social';
import { UserCard } from '../components/cards/user';
import { Location } from '../components/image/location';
import { Metadata } from '../components/image/metadata';
import { Stats } from '../components/image/stats';
import { Colors } from '../components/image/colors';
import { Tags } from '../components/image/tags';
import { ResponsiveImage } from '../components/image';

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: {},
      stats: {},
      id: props.match.params.id,
      isLoading: true,
      failed: false,
      favoritedByUser: false,
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
            isLoading: false,
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
      false,
    );

    const color = 'rgb(12, 12, 12)';

    return (
      <div>
        <div
          style={{
            backgroundColor: color,
          }}
        >
          <ResponsiveImage
            className="center"
            imageProps={{
              style: {
                backgroundColor: color,
                height: '90vh',
                width: '90vw',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              },
            }}
            url={image.src_links.raw}
          />
        </div>
        <div className="center flex justify-between pa2 ma3 w-80-l w-90">
          <span className="">
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
          </span>

          <span className="">
            <Favorite
              id={image.id}
              favorited={favorited}
              count={stats.favorites}
            />
          </span>
        </div>
        <div className="pa2 ma3 w-80-l w-90 center">
          <UserCard user={image.user} />

          <div className="bg-white br2 mt3 mb3 pa4 shadow-5">
            <Stats {...stats} />
          </div>

          <div className="bg-white br2 mt3 mb3 pa4 shadow-5">
            {image.metadata.location ? (
              <span className="w-80 center flex justify-around">
                <Location {...image.metadata.location} />
              </span>
            ) : null}

            <Metadata {...image.metadata} />
          </div>

          {image.tags.length !== 0 ? (
            <div className="bg-white br2 mt3 mb3 pa4 shadow-5">
              <span>
                <Tags tags={image.tags} />
              </span>
            </div>
          ) : null}

          {image.colors.length !== 0 ? (
            <div className="bg-white br2 mt3 mb3 pa4 shadow-5">
              <span>
                <Colors colors={image.colors} />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

ImageContainer.propTypes = {
  match: PropTypes.object,
};

export { ImageContainer };
