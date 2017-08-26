/* eslint-disable no-undef */

// Make a api query to the backend (on port 3001), make sure the response is JSON
// then check the HTTP headers
// then parse the JSON
// then run the callback function (cb)
function search(query, cb) {
  return fetch(`hello?q=${query}`, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

// Check HTTP headers for OK response otherwise throw error
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

// Parse the JSON
function parseJSON(response) {
  return response.json();
}

const Backend = { search };
export default Backend;

