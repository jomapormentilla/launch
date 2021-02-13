class Task {
    static all = []

    constructor({id, name, description, deadline, user_id, project_id}) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.userId = user_id
        this.projectId = project_id

        Task.all.push(this)
    }

    get user() {
        return User.all.find(u => u.id == this.userId)
    }

    get project() {
        return Project.all.find(p => p.id == this.projectId)
    }

    static render_tasks() {
        let html = ``
        for (let task of current_user.tasks) {
            html += `
                <div class="task-item" id="task-${ task.id }">
                    ${ task.name }
                    <i class="bi-arrow-right-square-fill" style="font-size: 2rem; color: #fff;"></i>
                </div>
            `
        }
        return html
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

    static render() {
        content.innerHTML = ``
        let div = document.createElement("div")
        div.id = "task-content"
        div.innerHTML = `
            <div class="flex" id="backlog">
                <div class="task-header">BACKLOG</div>
                ${ this.render_tasks() }
            </div>

            <div class="flex" id="inProgress">
                <div class="task-header">IN PROGRESS</div>
            </div>

            <div class="flex" id="completed">
                <div class="task-header">COMPLETED</div>
            </div>
        `
        div.addEventListener("click", this.handleTaskClick)
        content.append(div)
    }
}