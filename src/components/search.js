import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { UserCard } from './cards/user';
import { TagCard } from './cards/tags';
import { Loading } from '../components/loading';
import { ImageCard } from './cards/image';
import { GridCollection } from './collection';
import { Error, NoResults } from '../components/error';

const SearchComponent = ({ query, isLoading, isFailed, results, fetchResults, updateQuery }) => {
  let content = null;
  if (isLoading) content = <Loading />;
  else if (isFailed) content = <Error />;
  else if (results.images.length === 0 && results.users.length === 0 && results.tags.length === 0)
    content = <NoResults />;

  return (
    <div className="ph3 ph4-ns">
      {content ? (
        content
      ) : (
        <div>
          <SearchTagsView tags={results.tags} />
          <SearchUsersView users={results.users} />
          <SearchImagesView images={results.images} />
        </div>
      )}
    </div>
  );
};

SearchComponent.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFailed: PropTypes.bool.isRequired
};

const ResultsView = ({ title, cards }) =>
  cards.length ? (
    <div>
      <h3 className="sans-serif fw6 f4">{title}</h3>
      <GridCollection cards={cards} />
    </div>
  ) : (
    <div />
  );

ResultsView.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequried
    })
  )
};

const SearchImagesView = ({ images }) => (
  <ResultsView
    title="Images"
    cards={images.map(i => (
      <ImageCard key={i.id} image={i} />
    ))}
  />
);

SearchImagesView.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequried
    })
  )
};

const SearchUsersView = ({ users }) =>
  users.length ? (
    <div>
      <h3 className="sans-serif fw6 f4">Users</h3>
      <div className="nowrap overflow-x-auto">
        {users.map(t => (
          <span key={t.id} className="dib w5 pa2">
            <UserCard user={t} />
          </span>
        ))}
      </div>
    </div>
  ) : (
    <div />
  );

SearchUsersView.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequried
    })
  )
};

const SearchTagsView = ({ tags }) =>
  tags.length ? (
    <div>
      <h3 className="sans-serif fw6 f4">Tags</h3>
      <div className="nowrap overflow-x-auto">
        {tags.map(t => (
          <span key={t.id} className="dib w5 pa2">
            <TagCard {...t} />
          </span>
        ))}
      </div>
    </div>
  ) : (
    <div />
  );

SearchTagsView.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequried
    })
  )
};

export { SearchComponent, SearchImagesView, SearchTagsView, SearchUsersView };
