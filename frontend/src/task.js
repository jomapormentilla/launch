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

    // Associations
    get user() {
        return User.all.find(u => u.id == this.userId)
    }

    get project() {
        return Project.all.find(p => p.id == this.projectId)
    }

    // HTML Div Elements
    get html() {
        let data = {
            item: `
                <div class="task-item" id="task-${ this.id }">
                    ${ this.name }
                    <i class="bi-arrow-right-square-fill" style="font-size: 2rem; color: #fff;"></i>
                </div>
            `
        }
        return data
    }

    static get backlogContainer() {
        let data = {
            html: `
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
            `,

            select: () => {
                let data = `<select id="task-select"><option selected>Select a Project</option>`
                for (let project of current_user.assigned_projects) {
                    data += `<option value="${ project.id }">${ project.name }</option>`
                }
                data += `</select>`
                return data
            },

            sort: (array) => {
                let tasks = array.filter(t => t.user.id == current_user.id)
                let html = ``
                for (let task of tasks) {
                    html += task.html.item

                    if (task.status === "backlog") {
                        backlog.innerHTML += html
                    } else if (task.status === "inprogress") {
                        inProgress.innerHTML += html
                    } else if (task.status === "completed") {
                        completed.innerHTML += html
                    }
                }
            },

            selectChange: (e) => {
                if (e.target.value !== "Select a Project") {
                    let project = Project.all.find(p => p.id == e.target.value)
                    this.backlogContainer.reset()
                    this.backlogContainer.sort(project.tasks)
                }
            },

            reset: () => {
                backlog.innerHTML = `<div class="task-header">BACKLOG</div>`
                inProgress.innerHTML = `<div class="task-header">IN PROGRESS</div>`
                completed.innerHTML = `<div class="task-header">COMPLETED</div>`
            }
        }
        return data
    }

    // Click Handling
    static handleDivClick = e => {
        // debugger
        if (e.target.classList.contains("task-item")) {
            let task = Task.all.find(t => t.id == e.target.id.split("-")[1])
            if (e.target.parentElement.id === "backlog") {
                document.getElementById("inProgress").append(e.target)
                task.status = "inprogress"
            } else if (e.target.parentElement.id === "inProgress") {
                document.getElementById("completed").append(e.target)
                task.status = "completed"
            } else if (e.target.parentElement.id === "completed") {
                document.getElementById("inProgress").append(e.target)
                task.status = "inprogress"
            }
            TaskApi.updateTask(task)
        }
    }

    // Rendering Functions
    static renderDiv(html, id) {
        let div = document.createElement("div")
        div.dataset.id = id
        div.classList.add("flex")
        div.style.minWidth = "100%"
        div.innerHTML += html

        content.append(div)
        div.addEventListener("click", this.handleDivClick)
    }

    static render() {
        // Initial
        content.innerHTML = ``
        
        // Main Renders
        this.renderDiv(this.backlogContainer.select())
        this.renderDiv(this.backlogContainer.html)
        
        // Event Listeners
        document.querySelector("select").addEventListener("change", (e)=>{ this.backlogContainer.selectChange(e) })
    }
}