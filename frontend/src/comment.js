class Comment {
    static months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    static all = []
    
    constructor({id, content, user_id, commentable_type, commentable_id, created_at}) {
        this.id = id
        this.content = content
        this.userId = user_id
        this.type = commentable_type
        this.typeId = commentable_id
        this.created = new Date(created_at)

        Comment.all.push(this)
    }

    get user() {
        return User.all.find(u => u.id === this.userId)
    }

    get date() {
        let year, month, date, hour, min, sec, ampm

        year = this.created.getFullYear()
        month = Comment.months[this.created.getMonth()]
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