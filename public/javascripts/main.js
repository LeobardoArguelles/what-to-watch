var socket = io();

let form = document.getElementById("suggestion");
let input = document.getElementById("input");

var data = new FormData();
var xhr = new XMLHttpRequest();

const IMG_ROOT = 'https://image.tmdb.org/t/p/w342';


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
  node.classList.add('flex', 'flex-col', 'm-2', 'w-4/6', 'md:w-1/4', 'bg-black', 'shadow-2xl', 'rounded-lg', 'relative');

  // Poster image
  let poster = document.createElement('img');
  poster.src = IMG_ROOT + poster_path;
  poster.alt = title + '- Poster';
  poster.classList.add('hover:opacity-40', 'rounded-t-lg');
  node.appendChild(poster);

  // Voting buttons
  let yes_button = document.createElement('button');
  yes_button.classList.add('absolute', 'text-white', 'w-2/3', 'top-0', 'bg-green-600', 'rounded-lg', 'left-20');
  yes_button.textContent = '¡Quiero verla!';

  let checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkmark.setAttribute('fill', 'none');
  checkmark.setAttribute('viewBox', '0 0 24 24');
  checkmark.setAttribute('stroke', 'currentColor');
  checkmark.classList.add('h-6');

  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-line', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('d', 'M5 13l4 4L19 7');

  checkmark.appendChild(path);
  yes_button.appendChild(checkmark);
  node.appendChild(yes_button);

  // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  // <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />


  let no_button = document.createElement('button');
  let ban_button = document.createElement('button');
  

  // Suggestion title
  let span = document.createElement('div');
  let text = document.createTextNode(title);
  span.classList.add('bg-green-500', 'text-center');
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
  show_button.classList.add('bg-green-500');
  show_button.classList.add('rounded-b-lg');
  node.appendChild(show_button);
  
  document.getElementById("list").appendChild(node);
});

function show_overview(element) {
  alert(element.innerHTML);
}