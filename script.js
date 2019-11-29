const apiKey = '3tCrdhVBZWYZTN8bfLl3cPJZ2Yd3oof66eukRWo36yrktz7QiF';
const secret = 'IZAG2o6QDVal1fONI6IXbGqWoAtu6mR69amQZTi6';
let access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU4MWZlYjc3NTI3YzYxMzI1ZDU5Mjk3NDUzNTQ2YWU0N2NkMmNmMTBhY2RmMzBhODcxN2Q0OTE1ZTZiZDhkZGM1OGZkNGU2M2M3YzQwMTY2In0.eyJhdWQiOiIzdENyZGhWQlpXWVpUTjhiZkxsM2NQSloyWWQzb29mNjZldWtSV28zNnlya3R6N1FpRiIsImp0aSI6IjU4MWZlYjc3NTI3YzYxMzI1ZDU5Mjk3NDUzNTQ2YWU0N2NkMmNmMTBhY2RmMzBhODcxN2Q0OTE1ZTZiZDhkZGM1OGZkNGU2M2M3YzQwMTY2IiwiaWF0IjoxNTc1MDQ2MjU0LCJuYmYiOjE1NzUwNDYyNTQsImV4cCI6MTU3NTA0OTg1NCwic3ViIjoiIiwic2NvcGVzIjpbXX0.tM1AbOyoLlZHSC8BrajeCnqos24x5IFuDo2Ldg9KssXU9qCmkP8JfcyTvzqVUL0MOT85ELNPpawqQR8HQ-7NtMX8TeYz9FzcvM-478wUPOw0qSI9kZGXtYsLOrenLhfwKBBLf2tDbYt9qNeRZKmlhAswYmDLVeFlPc9Ql1v8KANCGglqPoC751HfU7nY_E6aOQUU-hqYHU8KKYs0ZdrPWalJ6pqvBh3XDw_5OLVz1_G1izMim8ez7Qn3IPwP5fv5zear-nf8aDZuH4TEs0GVwehJUDfutKdJX9Z7Otba4_cHrZFuBInUKZOlDK4RaZuR4lzxn1_XWKeQ9OjqVwbXFg";
const searchURL = 'https://api.petfinder.com/v2/animals/';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(){
  console.log(responseJson);
  $('#results-list').empty();
  if (responseJson.data.length === 0) {
    $('#results-list').append(`<h2>No results found! Please try again</h2>`);
  }
  else {
  for (let i = 0; i < responseJson.data.length; i++){
 console.log(i);
 $('#results-list').append(`
 <li> <h3>${responseJson.data[i].photos.small}</h3>
 <p>${responseJson.data[i].description}</p>
 <a href="responseJson.data[i].url>URL</a>`)
};
}
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
    //body: JSON.stringify
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
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