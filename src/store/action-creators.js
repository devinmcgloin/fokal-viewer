import { LOGIN, LOGOUT } from './action-types';

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

export { Login, Logout };
