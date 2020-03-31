// json file of crazy things
let requestURL = 'https://mikemacgregor.github.io/JSON/crazy_stuff_2.json';

// button on the page with event listener to trigger fetchAll
let button = document.querySelector('button');
button.addEventListener('click', fetchAll);

/*
// promises
fetch(requestURL).then(function(response) { // initial request, receive response
  return response.json();
}).then(function(json) {
  crazyStuff = json; // response to a json object
}).then(function() {
  areYouKiddingMe(crazyStuff); // call function to display info from json object
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});
*/

// promises w/ async + await
function fetchAll() {
  fetchCrazyStuff().then(function() { // fetch the json data
    shuffleArray(crazyStuff['areYouKiddingMe']); // randomize the returned content
  }).then(function() {
    areYouKiddingMe(crazyStuff); // now display
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  })
};

async function fetchCrazyStuff() {
  let response = await fetch(requestURL);
  crazyStuff = await response.json(); // if you define "let crazyStuff = await.response.json()" then get an error
  return crazyStuff;
}

// display the info
function areYouKiddingMe(jsonObj) {
  let areYouKiddingMe = jsonObj.areYouKiddingMe;
  let content = document.getElementById('content');
  // clear existing content
  content.innerHTML = "";
  for(let i = 0; i < Math.min(5, areYouKiddingMe.length); i++) { // max 5 items

    // build HTML
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    let img = document.createElement('img');

    div.setAttribute('class', 'col');
    img.setAttribute('src', 'https://mikemacgregor.github.io/JSON/img/' + areYouKiddingMe[i].image);
    img.setAttribute('alt', areYouKiddingMe[i].name);

    h3.textContent = areYouKiddingMe[i].name;
    h4.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(areYouKiddingMe[i].price);
    p.textContent = areYouKiddingMe[i].details;

    div.appendChild(h3);
    div.appendChild(img);
    div.appendChild(h4);
    div.appendChild(p);

    content.appendChild(div);

  }
}

// method to randomize array elements 
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
