import { LOGIN, LOGOUT } from './action-types';

const initialState = {
  loggedIn: false,
  jwt: undefined
};

function fokalReducer(state = initialState, action) {
  switch (action) {
    case LOGIN:
      return Object.assign({}, state, {
        loggedIn: true,
        jwt: action.jwt
      });
    case LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false,
        jwt: undefined
      });
    default:
      return state;
  }
}

export default fokalReducer;
