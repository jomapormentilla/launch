let current_user
const session = window.localStorage
const baseUrl = `http://localhost:3000`
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