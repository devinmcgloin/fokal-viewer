import JwtDecode from 'jwt-decode';
import { loadAuth } from './persistance';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const initialState = loadAuth() || {
  isLoggedIn: false,
  jwt: undefined,
  username: undefined
};

function Login(jwt) {
  return {
    type: LOGIN,
    jwt
  };
}

function Logout() {
  return {
    type: LOGOUT
  };
}

function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      const tok = JwtDecode(action.jwt);
      return Object.assign({}, state, {
        isLoggedIn: true,
        jwt: action.jwt,
        username: tok.sub
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        jwt: undefined,
        username: undefined
      });
    default:
      return state;
  }
}

export { Login, Logout, auth };
