const apiKey = '3tCrdhVBZWYZTN8bfLl3cPJZ2Yd3oof66eukRWo36yrktz7QiF';
const secret = 'IZAG2o6QDVal1fONI6IXbGqWoAtu6mR69amQZTi6';
let access_token = ' ';
const searchURL = 'https://api.petfinder.com/v2/animals/';
const accessURL = 'https://api.petfinder.com/v2/oauth2/token';
let expires = ' ';
let breed = ' ';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
const youTubeApiKey = 'AIzaSyAe-xtCZIobgp2U2wbPVj9SuGEwW5Amtug';


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
      let secondaryBreed = '';
      if (responseJson.animals[i].breeds.secondary){
        secondaryBreed = ', ' + responseJson.animals[i].breeds.secondary;
      }
      let contact = responseJson.animals[i].contact.email || '';
      $('#results-list').append(`
 <li> <h3>${responseJson.animals[i].name}</h3>
 <p>Breed: ${responseJson.animals[i].breeds.primary}${secondaryBreed}</p>
 <p>Age: ${responseJson.animals[i].age}</p>
 <p>Location: ${responseJson.animals[i].contact.address.city}</p>
 <p>Status: ${responseJson.animals[i].status}</p>
 <p>Email: ${contact}</p>
 <a href="${responseJson.animals[i].url} target='_blank'>Find out more</a>`)
    };
  }
}

function displayWiki(responseJsonTube) {
  console.log(responseJsonTube);
  $('#video-results-list').empty();
  //for (let i = 0; i < responseJsonTube.items.length; i++){
    //console.log(i);
    $('#video-results-list').append(`
      <li><h3>${responseJsonTube.items[0].snippet.title}</h3>
      <p>${responseJsonTube.items[0].snippet.description}</p>
      <img src='${responseJsonTube.items[0].snippet.thumbnails.default.url}'>
      </li>`)
    };




function getWiki(type) {
  const params = {
    key: youTubeApiKey,
    part: 'snippet',
    q: type + ' training',
    type: 'video',
    videoEmbeddable: 'true'
  };
  console.log(params);
  const queryString = formatQueryParams(params)
  const url = youtubeURL + '?' + queryString;
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJsonTube => displayWiki(responseJsonTube))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getAnimal(location, type, breed) {
  const params = {
    location: location,
    type: type,
    breed: breed
  };
  console.log(params);
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);
  fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
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
    const breed = $('#js-search-breed').val();
    getAnimal(location, type, breed);
    getWiki(type);
  })
}

let auth = function () {
  fetch(`https://api.petfinder.com/v2/oauth2/token`, {
    method: 'POST',
    body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${secret}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then(res => res.json())
    .then(function (json) {
      console.log(json);
      access_token = json.access_token;
      console.log(access_token);
      expires = json.expires_in;
      console.log(expires);
    });
}

function checkToken() {
  if (expires < 0) {
    auth();
  }
  else {
    watchForm();
  }
}

function handleSearch() {
  auth();
  checkToken();
}

$(handleSearch);
