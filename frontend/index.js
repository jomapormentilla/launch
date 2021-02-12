const container = document.getElementById("container")
const content = document.getElementById("content")

document.addEventListener("DOMContentLoaded", (e) => {
    UserApi.getUsers()
    Login.render()
    Nav.seed()
})