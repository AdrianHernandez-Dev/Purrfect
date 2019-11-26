//const apiKey = '3tCrdhVBZWYZTN8bfLl3cPJZ2Yd3oof66eukRWo36yrktz7QiF';
//const secret = 'IZAG2o6QDVal1fONI6IXbGqWoAtu6mR69amQZTi6';
const access_token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU1ZTYzNDZmNGNmYzQzM2YxOTE1ZTRhMDQxNTE4OGY5NDZiNzJkNzg5NTU5ZDcyY2E0Mzk2YjQzNDkwOTJlMWUzMzExYTBkOGYwNGFiZTlmIn0.eyJhdWQiOiIzdENyZGhWQlpXWVpUTjhiZkxsM2NQSloyWWQzb29mNjZldWtSV28zNnlya3R6N1FpRiIsImp0aSI6IjU1ZTYzNDZmNGNmYzQzM2YxOTE1ZTRhMDQxNTE4OGY5NDZiNzJkNzg5NTU5ZDcyY2E0Mzk2YjQzNDkwOTJlMWUzMzExYTBkOGYwNGFiZTlmIiwiaWF0IjoxNTc0ODA4NDY0LCJuYmYiOjE1NzQ4MDg0NjQsImV4cCI6MTU3NDgxMjA2NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.tSIBgqIqqAYxzbyDl7m4KEl3ySOlnzdbPKuz2qOJhtY8n0GFkqYLQuINildzDIeiVMCCxi4c1VyIog9LTEnNHjd6OApPtLiw2H-MmDOFNy4EbrEVqW6w1ort7zqjZWgL8Jgzqo5Q1KVJFvPEtRPYsYiJBtFYaook1ctJdMR8B1dLHHAgXA8qf8BEZA7FmlQU0aYtkCJxio96udjsI0EL2sko8WtHXRCUyU2qxRvT-QZv0QVpi0l4F2hu5-yYfWPfC0XZ6zlN18gaksbwP25uMt3oArIYPZvp5ZoTDHum8whEy10bulPwoaNTk5bYcNWF-edsUboy3U8v2SSSKeOaRg";
const searchURL = 'https://api.petfinder.com/v2/animals/';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getAnimal(location, type) {
  const params = {

    location: location,
    type: type
  };
  console.log(params);
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url, {    
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  })
    .then(response => response.json())
    .then(responseJson => formatQueryParams(params));
}

function watchForm() {
  $('form').submit(function (event) {
    event.preventDefault();
    console.log('checked');
    const location = $('#js-search-term').val();
    console.log(location);
    const type = $('#js-search-type').val();
    console.log(type);
    getAnimal(location, type);
  })
}

$(watchForm);