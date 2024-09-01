class Api {
    url = 'https://rest-server-r6jt.onrender.com'


    getUsers(){
        return fetch(this.url+ '/sse').then(res => res.json())
    }

    newUser(name){
        return fetch(this.url + '/new-user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        }).then(res => res.json())
    }
}

export const api = new Api()