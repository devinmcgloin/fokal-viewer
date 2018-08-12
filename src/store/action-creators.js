import { LOGIN, LOGOUT } from './action-types';

function login(jwt) {
  return {
    type: LOGIN,
    jwt
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}
