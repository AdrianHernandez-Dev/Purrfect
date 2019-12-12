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
      console.log(responseJson.animals[i].photos.small);
      let secondaryBreed = '';
      if (responseJson.animals[i].breeds.secondary) {
        secondaryBreed = ', ' + responseJson.animals[i].breeds.secondary;
      }
      let contact = responseJson.animals[i].contact.email || '';
      $('#results-list').append(`
  <li> <h3>${responseJson.animals[i].name}</h3>
  <img src="${responseJson.animals[i].photos[0].small}"/>
 <p>Breed: ${responseJson.animals[i].breeds.primary}${secondaryBreed}</p>
 <p>Age: ${responseJson.animals[i].age}</p>
 <p>Location: ${responseJson.animals[i].contact.address.city}</p>
 <p>Status: ${responseJson.animals[i].status}</p>
 <p>Email: ${contact}</p>
 <a href="${responseJson.animals[i].url}" target="_blank">Find out more</a>`)
    };
  }
}

function displayTube(responseJsonTube) {
  console.log(responseJsonTube);
  $('#video-results-list').empty();
  $('#video-results-list').append(`
      <li><h3>${responseJsonTube.items[0].snippet.title}</h3>
      <p>${responseJsonTube.items[0].snippet.description}</p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${responseJsonTube.items[0].id.videoId}" frameborder="0" 
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </li>`)
};




function getTube(type2) {
  const params = {
    key: youTubeApiKey,
    part: 'snippet',
    q: type2 + '  training',
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
    .then(responseJsonTube => displayTube(responseJsonTube))
    .catch(err => {
      $('#js-error-message').text(`No training available for this breed`);
    });
}

function getAnimal(location, type, breed) {
  const params = {
    location: location,
    type: type,
    breed: breed,
    limit: 100,
    status: 'adoptable'
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
      $('#results-list').text(`No adoptable pets available, Please try another breed or search a different zip code`);
    });
}

function watchForm() {
  $('form').submit(function (event) {
    event.preventDefault();
    console.log('checked');
    const location = $('#js-search-term').val();
    console.log(location);
    const type = $('#type-select').val();
    const type2 = $('#type-select').text();
    console.log(type);
    const breed = $('#js-search-breed').val();
    getAnimal(location, type, breed);
    getTube(type2);
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
