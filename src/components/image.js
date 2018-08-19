import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../components/loading';
import { NotFound } from '../components/error';
import { Download, Favorite } from '../components/buttons/social';
import { User } from '../components/image/user';
import { ContainedImage } from '../components/imgix';
import MetadataButton from '../components/buttons/metadata';
import LocationButton from '../components/buttons/location';

const ImageComponent = ({ isLoading, isFailed, image, username }) => {
  if (isLoading) return <Loading />;
  else if (isFailed) return <NotFound />;

  const stats = image.stats;
  const favorited = image.favorited_by.reduce(
    (acc, user) => (acc ? acc : user.includes(username)),
    false
  );

  return (
    <div>
      {/* <Header image={this.state.image} /> */}
      <div className="ph3 ph4-ns pv2 flex justify-between items-center pa2">
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
      <div className="bg-black-80 pa3">
        <ContainedImage url={image.src_links.raw} dimensions={image.metadata} />
      </div>
      <div className="ph3 ph4-ns pv2 flex justify-between items-center pa2">
        <LocationButton />
        <MetadataButton />
      </div>
    </div>
  );
};

export default ImageComponent;
