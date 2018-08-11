import React from 'react';
import { GridCollection } from './collection';
import { ImageCard } from './cards/image';
import { UserCard } from './cards/user';
import { TagCard } from './cards/tags';
import PropTypes from 'prop-types';

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

export { SearchImagesView, SearchTagsView, SearchUsersView };
