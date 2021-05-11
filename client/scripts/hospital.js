let socket = io('http://localhost:3000');

let chatsEl = document.getElementById('chats');

socket.on('recv_message', (message) => {
  let newEl = `<li>${message}</li>`;
  chatsEl.innerHTML += newEl;
});
