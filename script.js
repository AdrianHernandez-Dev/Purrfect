const apiKey = '3tCrdhVBZWYZTN8bfLl3cPJZ2Yd3oof66eukRWo36yrktz7QiF';
const secret = 'IZAG2o6QDVal1fONI6IXbGqWoAtu6mR69amQZTi6';
let access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzYTEzMmYwNDgxM2JiNzlhMTQxMWM0YTVjMGJiMWI2MTNhYTU2NjZmYzExZmQxY2I4ODM0YzIzYWZiYzJkMDk0YjNmMTY0ZGZlZmFjODdiIn0.eyJhdWQiOiIzdENyZGhWQlpXWVpUTjhiZkxsM2NQSloyWWQzb29mNjZldWtSV28zNnlya3R6N1FpRiIsImp0aSI6ImMzYTEzMmYwNDgxM2JiNzlhMTQxMWM0YTVjMGJiMWI2MTNhYTU2NjZmYzExZmQxY2I4ODM0YzIzYWZiYzJkMDk0YjNmMTY0ZGZlZmFjODdiIiwiaWF0IjoxNTc1MDQ5OTcxLCJuYmYiOjE1NzUwNDk5NzEsImV4cCI6MTU3NTA1MzU3MSwic3ViIjoiIiwic2NvcGVzIjpbXX0.tAmyQ0jl9eS0Aslv5QChFhC6UF82BoL_paPzNAR4v2FEBzGHuFiGgvnlYEITgacvAjyNvqUbBIuAUj_i6HcLH5ANUAVgx3cFqRLVkvHd3WQTPDHrBHH4_JXxOgyf9g8hCY-myGKdw7au65t0FGXyA2eF-4L7BEo9CZxc4o81CVtyG8Ri1r7xpBXP7xaX4dSp5cWIp6p19fW0KvU435dA5_zsGmahHvtKkdAj8ZmzdkxDRoI8_GOkFzqMIQGJNK6Q0YetZZfISFqTRUDTSMhDPBYWH8P_RN15qcs8GpJBNncAOxEDrJZSJQmnJNqdko6moYH_r_eZQ9-sI2dCMqo7AA";
const searchURL = 'https://api.petfinder.com/v2/animals/';

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