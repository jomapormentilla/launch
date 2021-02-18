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
}