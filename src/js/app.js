import { api } from "./Api"

const modal = document.querySelector('.modal')
const modalForm = modal.querySelector('form')
const windowChat = document.querySelector('.windowChat')
const friends = document.querySelector('.friends')
const inp = document.querySelector('.chatText')
const containerMessage = document.querySelector('.chatContainer')
let socket = null

const appData = {
    user: null,
    users: []
}


function startChat(){
  socket = new WebSocket('wss://rest-server-r6jt.onrender.com/sse')
  socket.onopen = (event) => {
    console.log('Соединение установлено');
  }
  socket.onmessage = function(event) {  
    const data = JSON.parse(event.data)
    if(data.type === 'send'){
      renderMessage(data)
    } else {
      console.log(data);
      appData.users = data
      friends.innerHTML = ''
      data.forEach(renderFriend)
    }
  };
}


window.onbeforeunload = function(event) {
  const msg = {type : 'exit', user: appData.user}
  socket.send(JSON.stringify(msg))
};

function renderMessage(obj){
  const message = document.createElement('div')
  message.classList.add('message')
  const date = new Date()
  if(obj.name === appData.user.name){
    message.classList.add('message__right')
    message.innerHTML = `
      <div class="message__info">
        <h3 class="message__name">You</h3>
        <p class="message__text">${obj.text}</p>
        <span class="message__time">${date.getHours()}:${date.getMinutes()}</span>
      </div>
    `
  }else {
    message.innerHTML = `
      <div class="message__info">
        <h3 class="message__name">${obj.name}</h3>
        <p class="message__text">${obj.text}</p>
        <span class="message__time">${date.getHours()}:${date.getMinutes()}</span>
      </div>
    `
  }
  containerMessage.append(message)
}

function renderFriend (obj){
    const friend = document.createElement('div')
    friend.classList.add('friend')
    friend.innerHTML = `
        <div class="friend__avatar"></div>
        <h2 class="friend__name">${obj.id === appData?.user?.id ? 'You' : obj.name}</h2>
    `
    friends.append(friend)
}





modalForm.addEventListener('submit', async (e) => {
    try{
        e.preventDefault()
        const {name} = modalForm.elements
        const {user} = await api.newUser(name.value)
        if(user){
          appData.user = user
          windowChat.classList.add('active')
          friends.classList.add('active')
          modal.classList.remove('active')
          startChat()
        }else {
            alert('Пользователь с таким именем уже существует')
        }
    } catch (e) {
        console.log(e);
    }
})


inp.addEventListener('keyup', (e) => {
    if(e.key === 'Enter'){
        const msg = {type : 'send', name: appData.user.name, text: inp.value}
        socket.send(JSON.stringify(msg))
        inp.value = ''
    }
})






