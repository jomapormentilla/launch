let current_user
const session = window.localStorage
const baseUrl = `http://localhost:3000`

const socketUrl = `ws://localhost:3000/cable`
const socket = new WebSocket(socketUrl)

const container = document.getElementById("container")
const content = document.getElementById("content")

document.addEventListener("DOMContentLoaded", (e) => {
    DepartmentApi.getDepartments()
    ProjectApi.getProjects()
    TaskApi.getTasks()
    UserApi.getUsers()
    MessageApi.getMessages()
    CommentApi.getComments()
    setTimeout(()=>{ Login.render() }, 1000)
    Nav.seed()
})

socket.onopen = (e) => {
    console.log(e)
    const data = {
        command: `subscribe`,
        identifier: JSON.stringify({
            channel: `MessageChannel`
        })
    }
    socket.send(JSON.stringify(data))
}

socket.onmessage = (e) => {
    let message = JSON.parse(e.data)
    if (message.type === "ping") return

    if (!!message.message) {
        if (message.message.type === "create") {
            let m = new Message(message.message.data)
            let receiver = User.all.find(u => u.id === m.receiverId)
            let sender = User.all.find(u => u.id === m.senderId)

            MessageApi.getMessages()
            setTimeout(()=>{
                if (document.querySelector(".active").innerText === "Inbox") {
                    if (current_user === sender) {
                        Inbox.renderMessages(receiver)
                        Inbox.html.seen(receiver)

                    } else if (current_user === receiver) {
                        // Need to fix this - ".message-receiver" does not exist when it's the start of the conversation
                        if (!!document.querySelector(".message-receiver") && document.querySelector(".message-receiver").dataset.id == sender.id) {
                            Inbox.renderMessages(receiver)
                        } else {
                            if (!!document.querySelector(".message-active")) {
                                let current_active = document.querySelector(".message-active").dataset.id
                                setTimeout(()=>{ document.querySelector(".user-list #user-" + current_active).classList.add("message-active") }, 500)
                            }
                            Inbox.html.users(User.sortby("firstName").filter(u => u.id !== current_user.id))
                            document.getElementById("inbox-count").innerHTML = Message.unseen_total()
                        }
                    }
                } else {
                    document.getElementById("inbox-count").innerHTML = Message.unseen_total()
                }
            }, 500)
        }
    }
}