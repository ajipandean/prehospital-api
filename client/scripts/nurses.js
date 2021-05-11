let socket = io('http://localhost:3000');

let inputEl = document.getElementById('input');
let chatsEl = document.getElementById('chats');
let formEl = document.getElementById('form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('send_message', inputEl.value);
});

socket.on('recv_message', (message) => {
  const newEl = `<li>${message}</li>`;
  chatsEl.innerHTML += newEl;
  inputEl.value = '';
});
