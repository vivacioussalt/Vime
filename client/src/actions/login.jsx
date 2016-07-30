import { checkStatus, toJSON } from './fetchUtils';
import { push } from 'react-router-redux';

function setUser(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user
  };
}

export default function login(username, password) {
  return dispatch => {
    return fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(checkStatus)
    .then(toJSON)
    .then(user => dispatch(setUser(user)))
    .then(() => dispatch(push('/')))
    .catch(err => {
      throw err;
    })
  }
}
