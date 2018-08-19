import { LOGIN, LOGOUT } from './action-types';
import JwtDecode from 'jwt-decode';
import { loadStore } from './persistance';

const initialState = loadStore() || {
  auth: {
    isLoggedIn: false,
    jwt: undefined,
    username: undefined
  }
};

function fokalReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      console.log('LOGGING IN');
      const tok = JwtDecode(action.jwt);
      return Object.assign({}, state, {
        auth: {
          isLoggedIn: true,
          jwt: action.jwt,
          username: tok.sub
        }
      });
    case LOGOUT:
      return Object.assign({}, state, {
        auth: {
          isLoggedIn: false,
          jwt: undefined,
          username: undefined
        }
      });
    default:
      return state;
  }
}

export default fokalReducer;
