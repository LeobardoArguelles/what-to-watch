const xhr = new XMLHttpRequest();
var socket = io();

let form = document.getElementById("suggestion");
let input = document.getElementById("input");

form.addEventListener('submit', function(e) {
  // e.preventDefault();
  if (input.value) {
    // xhr.open("GET", )
    socket.emit('Searching for: ', input.value.trim());
    input.value = '';
  }
});