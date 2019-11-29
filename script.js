const apiKey = '3tCrdhVBZWYZTN8bfLl3cPJZ2Yd3oof66eukRWo36yrktz7QiF';
const secret = 'IZAG2o6QDVal1fONI6IXbGqWoAtu6mR69amQZTi6';
let access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ3YmI4ZmI1MDlhM2NiY2Y2M2FhOWI4MzE2OTBjZjMwM2I1YjhjMGZmMjA3NTdhZWM4MTllM2QwZWIwZDdiOWNjZmQ3YzIxMmM1Njg4M2IxIn0.eyJhdWQiOiIzdENyZGhWQlpXWVpUTjhiZkxsM2NQSloyWWQzb29mNjZldWtSV28zNnlya3R6N1FpRiIsImp0aSI6ImQ3YmI4ZmI1MDlhM2NiY2Y2M2FhOWI4MzE2OTBjZjMwM2I1YjhjMGZmMjA3NTdhZWM4MTllM2QwZWIwZDdiOWNjZmQ3YzIxMmM1Njg4M2IxIiwiaWF0IjoxNTc0ODE4NDg5LCJuYmYiOjE1NzQ4MTg0ODksImV4cCI6MTU3NDgyMjA4OSwic3ViIjoiIiwic2NvcGVzIjpbXX0.iZSLWGnDXL-ILh7u-mfnOrH_MVsWTXDmB4XLwyWbFM61ijYdeVeenhHuYgM4-uRUP_LRAYppLDGcrdnOAAusfOvjgCsG0OHMhNhu3zTJxt_K3M_zPKxvkVicOEzYkR4WniFl_J9x0a44NkIk7yoKaSh115pch-Ho0cG8djq08BuDWiQgPcYvJxLiR-DPgeeP8-pDQdvJfc1uaZPEfBBB8WTjuVo5FUS_b4l8tLEYhc_T_PKclcY2Ess-cgJ3VZ13JaoQFZtZ0pkaskeGOZg6-g51Qvydffa3jjfhjTZCWMQNBpDGc5BeAGNPUWEOlXpx409fTPB05SbogrL1l0PRzA";
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