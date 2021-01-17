var socket = io();

let form = document.getElementById("suggestion");
let input = document.getElementById("input");

var data = new FormData();
var xhr = new XMLHttpRequest();


form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    console.log("AJAX");
    data.append("input", input.value);
    console.log(data.get("input"));
    xhr.open("POST", "/");
    xhr.send(data);
    // socket.emit('Searching for: ', input.value.trim());
    // input.value = '';
  }
});