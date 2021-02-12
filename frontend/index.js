let current_user
const baseUrl = `http://localhost:3000`
const container = document.getElementById("container")
const content = document.getElementById("content")

document.addEventListener("DOMContentLoaded", (e) => {
    DepartmentApi.getDepartments()
    ProjectApi.getProjects()
    TaskApi.getTasks()
    UserApi.getUsers()
    Login.render()
    Nav.seed()
})