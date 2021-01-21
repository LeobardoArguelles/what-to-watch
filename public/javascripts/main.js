var socket = io();

let form = document.getElementById("suggestion");
let input = document.getElementById("input");

var data = new FormData();
var xhr = new XMLHttpRequest();

const IMG_ROOT = 'https://image.tmdb.org/t/p/w154';


form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("suggestion", input.value.trim());
    input.value = '';
  }
});

socket.on('update', function(title, poster_path, overview) {

  // Container
  let node = document.createElement("div");
  node.classList.add('flex', 'flex-col', 'm-2', 'w-40');

  // Poster image
  let poster = document.createElement('img');
  poster.src = IMG_ROOT + poster_path;
  poster.alt = title + '- Poster';
  node.appendChild(poster);

  // Suggestion title
  let span = document.createElement('div');
  let text = document.createTextNode(title);
  span.appendChild(text);
  node.appendChild(span);

  // Overview
  let overview_content = document.createTextNode(overview);
  let overview_span = document.createElement('div');
  overview_span.appendChild(overview_content);
  overview_span.classList.add('hidden');
  node.appendChild(overview_span);

  // Show overview
  let show_button = document.createElement('button');
  show_button.textContent = 'Overview';
  show_button.setAttribute('onclick', 'show_overview(this.previousElementSibling)');
  // show_button.classList.add('');
  node.appendChild(show_button);
  
  document.getElementById("list").appendChild(node);
});

function show_overview(element) {
  alert(element.innerHTML);
}