const apiKey = '3tCrdhVBZWYZTN8bfLl3cPJZ2Yd3oof66eukRWo36yrktz7QiF';
const secret = 'IZAG2o6QDVal1fONI6IXbGqWoAtu6mR69amQZTi6';
let access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY3OWRhMmNiNzIyODYzOThjZWEzYjI2MjBlM2ExYjI3Mzc4YjZlYzJjNmNhZmY4OTk3MDQ4ODc4ZGQxOWViNDA4NTVhNTYyNjYwMzA1MTcwIn0.eyJhdWQiOiIzdENyZGhWQlpXWVpUTjhiZkxsM2NQSloyWWQzb29mNjZldWtSV28zNnlya3R6N1FpRiIsImp0aSI6ImY3OWRhMmNiNzIyODYzOThjZWEzYjI2MjBlM2ExYjI3Mzc4YjZlYzJjNmNhZmY4OTk3MDQ4ODc4ZGQxOWViNDA4NTVhNTYyNjYwMzA1MTcwIiwiaWF0IjoxNTc1MTMyNDY1LCJuYmYiOjE1NzUxMzI0NjUsImV4cCI6MTU3NTEzNjA2NSwic3ViIjoiIiwic2NvcGVzIjpbXX0.iupW4ntWSrU4vHc0eYP0WltSmER3QHxEQxuBTWG1btAZITkMFUA921DDnUFoGOU3Ij6zbUhO4bRQ5TvqHIGHZau-VoXcdtge5XGD7apVNw_b8IZOKfj6Xebkh61cqsX6YeaOgLxu1EXMKJWWOa0iDkUa17su0GteOW1LaFcbxqp2W_mS_fIefBk5YXHiBzssZBnO_vqROJagvxE77yWi3dqAs6SkFcckDeoUhetMTzDEeFPp6rjf51iRhFWTS_izBKwA0WhZjeuaeQYaJ1HfCErjWZr-AOxbpojGdekiXjRR2HzQotqjcdDDhPTs8BoIRsOxoyoY2O9MRXO8VWPqEQ';
const searchURL = 'https://api.petfinder.com/v2/animals/';
const accessURL = 'https://api.petfinder.com/v2/oauth2/token'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  if (responseJson.animals.length === 0) {
    $('#results-list').append(`<h2>No results found! Please try again</h2>`);
  }
  else {
    for (let i = 0; i < responseJson.animals.length; i++) {
      console.log(i);
      $('#results-list').append(`
 <li> <h3>${responseJson.animals[i].name}</h3>
 <img src="${responseJson.animals[i].photos.medium}">
 <p>Breed: ${responseJson.animals[i].breeds.primary}</p>
 <p>Age: ${responseJson.animals[i].age}</p>
 <p>Location: ${responseJson.animals[i].contact.address.city}</p>
 <p>Status: ${responseJson.animals[i].status}</p>
 <p>Email: ${responseJson.animals[i].contact.email}</p>
 <a href="${responseJson.animals[i].url}">Find out more</a>`)
    };
    //console.log(distance);
  }
}

function getAccess(){
  const params = {
    grant_type : 'client_credentials',
    client_id : apiKey,
    client_secret : secret
  };
  console.log(params);
  const queryString = formatQueryParams(params)
  const url = accessURL + '?' + queryString;
  console.log(url);
  $.post(url, )
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
    },
    body: JSON.stringify()
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
    getAccess();
    getAnimal(location, type);
  })
}

function handleSearch(){
  //getAccess();
  watchForm();
}

$(handleSearch);