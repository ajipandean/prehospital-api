let socket = io('http://localhost:3000');

let chatsEl = document.getElementById('chats');

socket.on('recv_message', (newMessage) => {
  console.log(newMessage);

  const newEl = `<li>${newMessage.message}</li>`;
  chatsEl.innerHTML += newEl;
});
