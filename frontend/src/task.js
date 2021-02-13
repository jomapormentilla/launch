class Task {
    static backlog = document.getElementById("backlog")
    static inProgress = document.getElementById("inProgress")
    static completed = document.getElementById("completed")

    static all = []

    constructor({id, name, description, deadline, user_id, project_id, status}) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.userId = user_id
        this.projectId = project_id
        this.status = status

        Task.all.push(this)
    }

    get user() {
        return User.all.find(u => u.id == this.userId)
    }

    get project() {
        return Project.all.find(p => p.id == this.projectId)
    }

    static handleTaskClick = e => {
        if (e.target.classList.contains("task-item")) {
            let task = Task.all.find(t => t.id == e.target.id.split("-")[1])
            if (e.target.parentElement.id === "backlog") {
                document.getElementById("inProgress").append(e.target)
            } else if (e.target.parentElement.id === "inProgress") {
                document.getElementById("completed").append(e.target)
            } else if (e.target.parentElement.id === "completed") {
                document.getElementById("inProgress").append(e.target)
            }
        }
    }

    static selectProject() {
        let div = document.createElement("select")
        div.innerHTML = `<option selected>Select a Project</option>`
        for (let proj of current_user.assigned_projects) {
            let option = document.createElement("option")
            option.value = proj.id
            option.innerText = proj.name
            div.append(option)
        }
        div.addEventListener("change", this.handleSelectChange)
        return div
    }

    static render_tasks(array) {
        let tasks = array.filter(t => t.user.id == current_user.id)
        let html = ``
        for (let task of tasks) {
            html += `
                <div class="task-item" id="task-${ task.id }">
                    ${ task.name }
                    <i class="bi-arrow-right-square-fill" style="font-size: 2rem; color: #fff;"></i>
                </div>
            `
            if (task.status === "backlog") {
                backlog.innerHTML += html
            } else if (task.status === "inprogress") {
                inProgress.innerHTML += html
            } else if (task.status === "completed") {
                completed.innerHTML += html
            }
        }
        return html
    }

    static handleSelectChange = e => {
        if (e.target.value !== "Select a Project") {
            let project = Project.all.find(p => p.id == e.target.value)
            this.resetContainers()
            this.render_tasks(project.tasks)
        }
    }

    static resetContainers() {
        backlog.innerHTML = `<div class="task-header">BACKLOG</div>`
        inProgress.innerHTML = `<div class="task-header">IN PROGRESS</div>`
        completed.innerHTML = `<div class="task-header">COMPLETED</div>`
    }

    static render() {
        content.innerHTML = ``
        let div = document.createElement("div")
        div.id = "task-content"
        div.innerHTML = `
            <div id="progress-tracker">
                <div class="flex" id="backlog">
                    <div class="task-header">BACKLOG</div>
                </div>

                <div class="flex" id="inProgress">
                    <div class="task-header">IN PROGRESS</div>
                </div>

                <div class="flex" id="completed">
                    <div class="task-header">COMPLETED</div>
                </div>
            </div>
        `
        div.prepend(this.selectProject())
        div.addEventListener("click", this.handleTaskClick)
        content.append(div)
    }
}