var socket = io();

let form = document.getElementById("suggestion");
let input = document.getElementById("input");

var data = new FormData();
var xhr = new XMLHttpRequest();

let vote_pattern = /(.+)( buttons)/;

const IMG_ROOT = 'https://image.tmdb.org/t/p/w342';

// Test for autocomplete
var options = ['Alita: Battle Angel', 'Alice in Wonderland', 'Alien', 'A Nightmare on Elm Street'];


form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("suggestion", input.value.trim());
    input.value = '';
  }
});

socket.once('create', (suggestions) => {
  console.log("New room created!");
  if (!(empty(suggestions))){
    for (const [key, movie] of Object.entries(suggestions)) {
      update_page(movie.name, movie.poster, movie.overview);
    }
  }  
});

socket.on('update', (title, poster_path, overview) => {
  update_page(title, poster_path, overview);
});

socket.on('update_score', (movie_title, current_score) => {
  update_score(movie_title, current_score);
});

function update_page(title, poster_path, overview) {

  // Container
  let node = document.createElement("div");
  node.classList.add('flex', 'flex-col', 'm-2', 'w-4/6', 'lg:w-1/4', 'bg-black', 'shadow-xl', 'rounded-lg', 'relative');

  // Suggestion title
  let span = document.createElement('div');
  let text = document.createTextNode(title);
  span.classList.add('bg-indigo-800', 'text-center', 'text-white', 'font-bold', 'rounded-t-lg', 'text-2xl', 'px-8');
  span.classList.add('leading-7', 'pt-2');
  span.appendChild(text);
  node.appendChild(span);

  // Voting div
  let voting_group = document.createElement('div');
  voting_group.id = title + ' buttons';
  voting_group.classList.add('flex', 'flex-row', 'w-full', 'items-center', 'h-3/5', 'md:h-4/5', 'lg:h-full', 'justify-around', 'top-8');
  voting_group.classList.add('bg-indigo-800', 'py-2');

  // Voting buttons
  let yes_button = document.createElement('button');
  yes_button.id = title + ' upvote';
  yes_button.classList.add('text-white', 'w-1/5', 'top-0', 'bg-green-600', 'rounded-full', 'text-center', 'inline-flex', 'items-center', 'flex-row-reverse', 'text-sm', 'md:text-lg', 'lg:text-base', 'justify-center');
  yes_button.classList.add( 'h-4/5', 'max-h-12');
  yes_button.classList.add('transition', 'duration-300', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110');
  yes_button.onclick = (e) => {
    let movie_title = vote_pattern.exec(e.target.closest('div').id)[1];
    socket.emit('vote', movie_title, 1);
    show_score(movie_title);
  }

  let thumb_up = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  thumb_up.setAttribute('fill', 'none');
  thumb_up.setAttribute('viewBox', '0 0 24 24');
  thumb_up.setAttribute('stroke', 'currentColor');
  thumb_up.classList.add('h-4/6', 'max-h-10', 'mx-2', 'md:mx-4');

  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-line', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('d', 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5');

  thumb_up.appendChild(path);
  yes_button.appendChild(thumb_up);
  voting_group.appendChild(yes_button);

  let no_button = document.createElement('button');
  no_button.id = title + ' downvote';
  no_button.classList.add('text-white', 'w-1/5', 'top-0', 'bg-red-700', 'rounded-full', 'text-center', 'inline-flex', 'items-center', 'flex-row-reverse', 'text-sm', 'md:text-lg', 'lg:text-base', 'justify-center');
  no_button.classList.add( 'h-4/5', 'max-h-12');
  no_button.classList.add('transition', 'duration-300', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110');
  no_button.onclick = (e) => {
    let movie_title = vote_pattern.exec(e.target.closest('div').id)[1];
    socket.emit('vote', movie_title, -1);
    show_score(movie_title);
  }

  let thumb_down = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  thumb_down.setAttribute('fill', 'none');
  thumb_down.setAttribute('viewBox', '0 0 24 24');
  thumb_down.setAttribute('stroke', 'currentColor');
  thumb_down.classList.add('h-4/6', 'max-h-10', 'mx-2', 'md:mx-4');

  let xpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  xpath.setAttribute('stroke-line', 'round');
  xpath.setAttribute('stroke-linejoin', 'round');
  xpath.setAttribute('stroke-width', '2');
  xpath.setAttribute('d', 'M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5');

  thumb_down.appendChild(xpath);
  no_button.appendChild(thumb_down);
  voting_group.appendChild(no_button);

  let ban_button = document.createElement('button');
  ban_button.id = title + ' ban';
  ban_button.classList.add('text-white', 'w-1/5', 'top-0', 'bg-black', 'rounded-full', 'text-center', 'inline-flex', 'items-center', 'flex-row-reverse', 'text-sm', 'md:text-lg', 'lg:text-base', 'justify-center');
  ban_button.classList.add( 'h-4/5', 'max-h-12');
  ban_button.classList.add('transition', 'duration-300', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110');
  ban_button.onclick = (e) => {
    let movie_title = vote_pattern.exec(e.target.closest('div').id)[1];
    socket.emit('ban', movie_title);
  }

  let ban_symbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  ban_symbol.setAttribute('fill', 'none');
  ban_symbol.setAttribute('viewBox', '0 0 24 24');
  ban_symbol.setAttribute('stroke', 'currentColor');
  ban_symbol.classList.add('h-4/6', 'max-h-10', 'mx-2', 'md:mx-4');

  let ban_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  ban_path.setAttribute('stroke-line', 'round');
  ban_path.setAttribute('stroke-linejoin', 'round');
  ban_path.setAttribute('stroke-width', '2');
  ban_path.setAttribute('d', 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636');

  ban_symbol.appendChild(ban_path);
  ban_button.appendChild(ban_symbol);
  voting_group.appendChild(ban_button);

  // Score keeper

  let score_text = document.createElement('p');
  score_text.id = title + ' score';
  score_text.classList.add('text-white', 'font-mono');
  score_text.classList.add('bg-indigo-800', 'py-2');
  score_text.classList.add('hidden');
  score_text.textContent = 'Puntuación: 0';
  voting_group.appendChild(score_text);

  node.appendChild(voting_group);  

  // Poster image
  let poster = document.createElement('img');
  poster.src = IMG_ROOT + poster_path;
  poster.alt = title + '- Poster';

  // Vote decoration
  let decoration = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  decoration.setAttribute('fill', 'none');
  decoration.setAttribute('viewBox', '0 0 24 24');
  decoration.setAttribute('stroke', 'black');
  decoration.classList.add('h-4/6', 'mx-2', 'md:mx-4');

  let dec_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  dec_path.setAttribute('stroke-line', 'round');
  dec_path.setAttribute('stroke-linejoin', 'round');
  dec_path.setAttribute('stroke-width', '2');
  dec_path.setAttribute('d', 'M130.22708,71.224065 22.04973,17.038434 0.13364,-14.967096 c 0,0 0.16704,-1.971111 -2.23839,-2.00452 -2.40542,-0.03341 -19.94498,-0.06682 -19.94498,-0.06682 z');
  
  decoration.appendChild(dec_path);
  poster.appendChild(decoration);
  node.appendChild(poster);

  // Overview
  let overview_content = document.createTextNode(overview);
  let overview_span = document.createElement('div');
  overview_span.appendChild(overview_content);
  overview_span.classList.add('hidden');
  node.appendChild(overview_span);

  // Show overview
  let show_button = document.createElement('button');
  show_button.textContent = 'Leer sinopsis';
  show_button.setAttribute('onclick', 'show_overview(this.previousElementSibling)');
  show_button.classList.add('bg-indigo-800', 'text-white');
  show_button.classList.add('rounded-b-lg');
  node.appendChild(show_button);


  document.getElementById("list").appendChild(node);
}

function show_overview(element) {
  alert(element.innerHTML);
}

function show_buttons(element) {
  element.classList.add('opacity-40');
  let buttons = element.parentElement.firstChild.nextSibling;
  buttons.classList.remove('z-0');
  buttons.classList.add('z-20');
}

function show_score(movie) {

  // Buttons to hide
  let yes_button = document.getElementById(movie + ' upvote');
  let no_button = document.getElementById(movie + ' downvote');
  let ban_button = document.getElementById(movie + ' ban');

  yes_button.classList.add('hidden');
  no_button.classList.add('hidden');
  ban_button.classList.add('hidden');

  // Show score element
  score_keeper = get_score_element(movie);
  score_keeper.classList.remove('hidden');
}

function empty(obj) {
  return Object.keys(obj).length === 0;
}

function update_score(movie, current_score) {
  let score_keeper = get_score_element(movie);
  score_keeper.textContent = 'Puntuación:' + current_score;
}

function get_score_element (movie_title) {
  return document.getElementById(movie_title + ' score'); 
}

function autocomplete(inp, arr) {
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
} 

// Call to autocomplete
autocomplete(document.getElementById('input'), options);
