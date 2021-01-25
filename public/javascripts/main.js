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
  node.classList.add('flex', 'flex-col', 'm-2', 'w-4/6', 'lg:w-1/4', 'bg-black', 'shadow-2xl', 'rounded-lg', 'relative');

  // Voting div
  let voting_group = document.createElement('div');
  voting_group.id = title + ' buttons';
  voting_group.classList.add('absolute', 'flex', 'flex-col', 'w-full', 'items-center', 'h-3/5', 'md:h-4/5', 'lg:h-3/4', 'justify-around');
  voting_group.classList.add('z-0');
  voting_group.addEventListener('mouseleave', (e) => {
    hide_buttons(e.target);
  });


  // Voting buttons
  let yes_button = document.createElement('button');
  yes_button.classList.add('text-white', 'w-2/3', 'top-0', 'bg-green-600', 'rounded-lg', 'text-center', 'inline-flex', 'items-center', 'flex-row-reverse', 'h-1/5', 'text-sm', 'md:text-lg', 'lg:text-base', 'justify-end');
  yes_button.textContent = '¡Quiero verla!';

  let checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkmark.setAttribute('fill', 'none');
  checkmark.setAttribute('viewBox', '0 0 24 24');
  checkmark.setAttribute('stroke', 'currentColor');
  checkmark.classList.add('h-4/6', 'mx-2', 'md:mx-4');

  let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke-line', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('d', 'M5 13l4 4L19 7');

  checkmark.appendChild(path);
  yes_button.appendChild(checkmark);
  voting_group.appendChild(yes_button);

  let no_button = document.createElement('button');
  no_button.classList.add('text-white', 'w-2/3', 'top-0', 'bg-red-700', 'rounded-lg', 'text-center', 'inline-flex', 'items-center', 'flex-row-reverse', 'h-1/5', 'text-sm', 'md:text-lg', 'lg:text-base', 'justify-end');
  no_button.textContent = 'No quiero verla';

  let xmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  xmark.setAttribute('fill', 'none');
  xmark.setAttribute('viewBox', '0 0 24 24');
  xmark.setAttribute('stroke', 'currentColor');
  xmark.classList.add('h-4/6', 'mx-2', 'md:mx-4');

  let xpath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  xpath.setAttribute('stroke-line', 'round');
  xpath.setAttribute('stroke-linejoin', 'round');
  xpath.setAttribute('stroke-width', '2');
  xpath.setAttribute('d', 'M6 18L18 6M6 6l12 12');

  xmark.appendChild(xpath);
  no_button.appendChild(xmark);
  voting_group.appendChild(no_button);

  let ban_button = document.createElement('button');
  ban_button.classList.add('text-white', 'w-2/3', 'top-0', 'bg-black', 'rounded-lg', 'text-center', 'inline-flex', 'items-center', 'flex-row-reverse', 'h-1/5', 'text-sm', 'md:text-lg', 'lg:text-base', 'justify-end');
  ban_button.textContent = 'Vetar';

  let ban_symbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  ban_symbol.setAttribute('fill', 'none');
  ban_symbol.setAttribute('viewBox', '0 0 24 24');
  ban_symbol.setAttribute('stroke', 'currentColor');
  ban_symbol.classList.add('h-4/6', 'mx-2', 'md:mx-4');

  let ban_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  ban_path.setAttribute('stroke-line', 'round');
  ban_path.setAttribute('stroke-linejoin', 'round');
  ban_path.setAttribute('stroke-width', '2');
  ban_path.setAttribute('d', 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636');

  ban_symbol.appendChild(ban_path);
  ban_button.appendChild(ban_symbol);
  voting_group.appendChild(ban_button);
  node.appendChild(voting_group);  

  // Poster image
  let poster = document.createElement('img');
  poster.src = IMG_ROOT + poster_path;
  poster.alt = title + '- Poster';
  poster.classList.add('rounded-t-lg', 'z-10');
  poster.addEventListener('mouseenter', (e) => {
    show_buttons(e.target);
  });

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


  // Suggestion title
  let span = document.createElement('div');
  let text = document.createTextNode(title);
  span.classList.add('bg-green-900', 'text-center', 'text-white');
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
  show_button.textContent = 'Leer sinopsis';
  show_button.setAttribute('onclick', 'show_overview(this.previousElementSibling)');
  show_button.classList.add('bg-green-900', 'text-white');
  show_button.classList.add('rounded-b-lg');
  node.appendChild(show_button);
  
  document.getElementById("list").appendChild(node);
});

function show_overview(element) {
  alert(element.innerHTML);
}

function show_buttons(element) {
  element.classList.add('opacity-40');
  let buttons = element.parentElement.firstChild;
  buttons.classList.remove('z-0');
  buttons.classList.add('z-20');
}

function hide_buttons(element) {
  let poster_image = element.nextSibling;
  poster_image.classList.remove('opacity-40');
  element.classList.add('z-0');
  element.classList.remove('z-20');
}