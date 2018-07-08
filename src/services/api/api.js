/* global process */

import { GetJWT, LoggedIn, Logout, LogIn } from '../store/auth';
import { RefreshToken } from '../api/auth';
import JwtDecode from 'jwt-decode';

const endpoint = 'https://api.fok.al/v0';
//process.env.NODE_ENV === "production"
//? "https://api.fok.al/v0"
//: "http://localhost:8000/v0";

const getHeaders = method => {
  let headers = new Headers();
  if (LoggedIn()) {
    const jwt = GetJWT(),
      tok = JwtDecode(jwt),
      unix = Math.round(new Date().getTime() / 1000);

    if (unix > tok.exp) {
      // token is expired
      Logout();
    } else if (tok.exp > unix + 60000) {
      // token needs to be refreshed
      let new_token = RefreshToken(jwt).then(d => d.token);
      LogIn(new_token);
    } else {
      headers.append('Authorization', 'Bearer ' + jwt);
    }
    if (method === 'POST') headers.append('Content-Type', 'application/json');
  }
  return headers;
};

const ParseResponse = resp => {
  return { ok: resp.ok, status: resp.status, body: resp.json() };
};

export { endpoint, getHeaders, ParseResponse };
