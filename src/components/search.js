import React from 'react'
import {GridCollection} from "./collection";
import {ImageCardSmall} from "./cards/image";
import {NoResults} from "./error";
import {UserCard} from "./cards/user";
import {TagCard} from "./cards/tags";
import PropTypes from 'prop-types'

const SearchImagesView = ({images}) =>
    images.length ?
        <GridCollection cards={images.map(i => <ImageCardSmall key={i.id} image={i}/>)}/>
        : <NoResults/>;

SearchImagesView.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequried,

    }))
};

const SearchUsersView = ({users}) =>
    users.length ?
        <GridCollection cards={users.map(u => <UserCard key={u.id} user={u}/>)}/>
        : <NoResults/>;
SearchUsersView.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequried,
    }))
};

const SearchTagsView = ({tags}) =>
    tags.length ?
        <GridCollection cards={tags.map(t => <TagCard key={t.id} {...t}/>)}/>
        : <NoResults/>;

SearchTagsView.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequried,

    }))
};

export {SearchImagesView, SearchTagsView, SearchUsersView}
