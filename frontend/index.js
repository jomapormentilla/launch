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
    setTimeout(()=>{ Login.render() }, 1000)
    Nav.seed()
})

// socket.onopen = (e) => {
//     console.log(e)
//     const data = {
//         command: `subscribe`,
//         identifier: JSON.stringify({
//             channel: `MessageChannel`
//         })
//     }
//     socket.send(JSON.stringify(data))
// }

// socket.onmessage = (e) => {
//     let message = JSON.parse(e.data) 
//     if (message.type === "ping") return
// }