function checkStatus(res) {
  if (res.status >= 200 && res.status <= 300) {
    return res;
  } else if (res.status === 401) {
    return res.json()
      .then((err) => { throw new Error(err); });
  } else { 
    throw new Error(res.statusText);
  }
}

function toJSON(res) {
  return res.json();
}

export { checkStatus, toJSON }; 
