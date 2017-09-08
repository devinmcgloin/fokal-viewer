import React from 'react'
import {GridCollection} from "./collection";
import {ImageCardSmall} from "./cards/image/image";
import {NoResults} from "./error";
import {UserTitleCard} from "./cards/user/user";
import {TagCard} from "./cards/tags/tags";
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
        <GridCollection cards={users.map(u => <UserTitleCard key={u.id} usr={u}/>)}/>
        : <NoResults/>;
SearchUsersView.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequried,

    }))
};

const SearchTagsView = ({tags}) =>
    tags.length ?
        <GridCollection cards={tags.map(t => <TagCard key={t.id} id={t.id} image={t.image}/>)}/>
        : <NoResults/>;

SearchTagsView.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequried,

    }))
};

export {SearchImagesView, SearchTagsView, SearchUsersView}