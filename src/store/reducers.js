import { combineReducers } from 'redux';
import { auth } from './auth';
import { images } from './images';
import { search } from './search';

const fokalReducer = combineReducers({ auth: auth, images: images, search: search });

export default fokalReducer;
