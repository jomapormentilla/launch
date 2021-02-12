const container = document.getElementById("container")
const content = document.getElementById("content")

document.addEventListener("DOMContentLoaded", (e) => {
    ProjectApi.getProjects()
    TaskApi.getTasks()
    UserApi.getUsers()
    Login.render()
    Nav.seed()
})