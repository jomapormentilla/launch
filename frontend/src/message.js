class Message {
    static all = []

    constructor({id, content, sender_id, receiver_id, created_at, updated_at}) {
        this.id = id
        this.content = content
        this.senderId = sender_id
        this.receiverId = receiver_id
        this.created = created_at
        this.updated = updated_at

        Message.all.push(this)
    }

    static with(receiver) {
        return Message.all.filter(m => m.senderId === current_user.id && m.receiverId === receiver.id)
    }
}