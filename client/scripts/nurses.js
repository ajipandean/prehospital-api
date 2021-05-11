let socket = io('http://localhost:3000');

let inputEl = document.getElementById('input');
let chatsEl = document.getElementById('chats');
let formEl = document.getElementById('form');

socket.emit(
  'init_chat',
  {
    hospital_id: 'RSUD Sanglah',
    user_id: {
      id: '025a9278-55ce-4f8d-8bf9-5763f2eb5b08',
      group_name: 'Primakara Squad',
      email: 'ajikun@gmail.com',
      role: 'STUDENT',
      is_deleted: false,
      created_at: '2021-05-10 13:12:37.922309',
      updated_at: '2021-05-10 14:48:59.000000',
      deleted_at: null,
    },
  },
  (chat) => {
    let stringChat = JSON.stringify(chat);
    localStorage.setItem('chat', stringChat);
  },
);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const chat = localStorage.getItem('chat');
  socket.emit('send_message', {
    chat: JSON.parse(chat),
    message: inputEl.value,
  });
});

socket.on('recv_message', (newMessage) => {
  console.log(newMessage);

  const newEl = `<li>${newMessage.message}</li>`;
  chatsEl.innerHTML += newEl;
  inputEl.value = '';
});
