import { api } from "./Api"

const modal = document.querySelector('.modal')
const modalForm = modal.querySelector('form')

const windowChat = document.querySelector('.windowChat')
const friends = document.querySelector('.friends')

const appData = {
    user: null
}

async function init(){

    
}

function renderFriend (obj){
    const friend = document.createElement('div')
    friend.classList.add('friend')
    friend.innerHTML = `
        <div class="friend__avatar"></div>
        <h2 class="friend__name">${obj.name}</h2>
    `
    friends.append(friend)

    friend.addEventListener('click', () => {
        
    })
}



modalForm.addEventListener('submit', async (e) => {
    try{
        e.preventDefault()
        const {name} = modalForm.elements
        const {user} = await api.newUser(name.value)
        if(user){
            appData.user = user
            renderFriend({id: user.id, name: 'You'})
            windowChat.classList.add('active')
            friends.classList.add('active')
            modal.classList.remove('active')
        }
    } catch (e) {
        console.log(e);
    }
})


init()



