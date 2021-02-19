class MessageApi {
    static url = baseUrl + `/messages`

    static getMessages() {
        fetch(this.url)
            .then(res => res.json())
            .then(data => {
                for (let message of data) {
                    let _message = Message.all.find(m => m.id === message.id)
                    if (!_message) { new Message(message) }
                }
            })
    }

    static createMessage = data => {
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(this.url, configObj)
            // .then(res => res.json())
            // .then(data => {
            //     console.log(data)
            //     let user = User.all.find(u => u.id === data.receiver_id)
            //     this.getMessages()
            //     setTimeout(()=>{Inbox.renderMessages(user)}, 500)
            // })
    }

    static updateMessage = data => {
        let configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(this.url + `/${ data.id }`, configObj)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                document.getElementById("inbox-count").innerHTML = Message.unseen_total()
            })
    }
}