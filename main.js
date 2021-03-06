// access JSON file using an XHR object

let requestURL = 'https://mikemacgregor.github.io/JSON/crazy_stuff.json';

// create new XHR object; XHR allows us to fetch data without a page refresh
let request = new XMLHttpRequest();

// opening a new request
request.open('GET', requestURL);

// request type
request.responseType = 'json';

// send the request using the send method
request.send();

// wait for the request to be returned, store the response and invoke function to display info
request.onload = function() {
  let crazyStuff = request.response;
  // console.log(crazyStuff);
  areYouKiddingMe(crazyStuff);
};

function areYouKiddingMe(jsonObj) {
  let areYouKiddingMe = jsonObj.areYouKiddingMe;
  let main = document.querySelector('main');
  for(let i = 0; i < areYouKiddingMe.length; i++) {

    // build HTML
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let img = document.createElement('img');

    img.setAttribute('src', 'https://mikemacgregor.github.io/JSON/img/' + areYouKiddingMe[i].image);
    img.setAttribute('alt', areYouKiddingMe[i].name);

    h2.textContent = areYouKiddingMe[i].name;
    h3.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(areYouKiddingMe[i].price);
    p.textContent = areYouKiddingMe[i].details;

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);

    main.appendChild(div);

  }
}
