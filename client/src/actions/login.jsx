function setUser(user) {
  return {
    type: 'LOGIN_SUCCESS',
    user
  };
}

export default function login(username, password) {
  return dispatch => {
    return fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(user => dispatch(setUser(user)))
    .catch(err => {
      console.log(err);
    })
  }
}
