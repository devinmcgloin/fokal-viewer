import { combineReducers } from 'redux';
import { auth } from './auth';
import { images } from './images';

const fokalReducer = combineReducers({ auth: auth, images: images });

export default fokalReducer;
