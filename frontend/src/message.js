class Message {
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    static all = []

    constructor({id, content, sender_id, receiver_id, created_at, updated_at, seen}) {
        this.id = id
        this.content = content
        this.senderId = sender_id
        this.receiverId = receiver_id
        this.created = new Date(created_at)
        this.updated = new Date(updated_at)
        this.seen = seen

        Message.all.push(this)
    }

    static with(receiver) {
        return Message.all.filter(m => (m.senderId === current_user.id || m.receiverId === current_user.id) && (m.senderId === receiver.id || m.receiverId === receiver.id))
    }

    static unseen(user) {
        return this.with(user).filter(m => m.seen === false && m.senderId !== current_user.id)
    }

    static unseen_total() {
        let count = 0
        for (let user of User.all.filter(u => u !== current_user)) {
            count += this.unseen(user).length
        }
        return count
    }

    static markAsSeen(user) {
        if (Message.unseen(user).length !== 0){
            MessageApi.updateMessage(Message.unseen(user)[0])
        }
        // for (let message of Message.unseen(user)) {
        //     message.seen = true
        //     MessageApi.updateMessage(message)
        // }
    }

    get sender() {
        return User.all.find(u => u.id === this.senderId)
    }

    get receiver() {
        return User.all.find(u => u.id === this.receiverId)
    }

    get sent_date() {
        let year, month, date, hour, min, sec, ampm

        year = this.created.getFullYear()
        month = Message.months[this.created.getMonth()]
        date = this.created.getDate()
        hour = this.created.getHours()
        min = this.created.getMinutes()
        sec = this.created.getSeconds()
        ampm = "AM"

        if (hour > 12) {
            hour = hour - 12
            ampm = "PM"
        } else if (hour === 0) {
            hour = 12
        }

        if (min < 10) {
            min = "0" + min
        }

        if (sec < 10) {
            sec = "0" + sec
        }

        return `${ month } ${ date }, ${ year } - ${ hour }:${ min }:${ sec } ${ ampm }`
    }
}