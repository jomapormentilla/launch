class Project {
    static all = []

    constructor({id, name, description, creator_id, users, tasks}) {
        this.id = id
        this.name = name
        this.description = description
        this.creatorId = creator_id
        this.userIds = users
        this.taskIds = tasks

        Project.all.push(this)
    }

    // Associations
    get creator() {
        return User.all.find(u => u.id == this.creatorId)
    }

    get users() {
        let projectUsers = []
        for (let user of this.userIds) {
            let find = User.all.find(u => u.id == user.id)
            projectUsers.push(find)
        }
        return projectUsers
    }

    get tasks() {
        let projectTasks = []
        for (let task of this.taskIds) {
            let find = Task.all.find(t => t.id == task.id)
            projectTasks.push(find)
        }
        return projectTasks
    }

    get completedTasks() {
        // Need to implement
    }

    get inProgressTasks() {
        // Need to implement
    }

    get currentTeam() {
        let data = {
            list: () => {
                let html = ``
                for (let user of this.users) {
                    html += `<li id="${ user.id }">${ user.firstName } ${ user.lastName } - ${ user.department }</li>`
                }
                return html
            },
            option: () => {
                let html = ``
                for (let user of this.users) {
                    html += `<option value="${ user.id }">${ user.firstName } ${ user.lastName } - ${ user.department }</option>`
                }
                return html
            }
        }
        return data
    }

    // HTML Div Elements
    static get new() {
        let data = {
            card: `
                <div class="flex card" id="new-project-card" style="justify-content: center; align-items: center; flex-direction: column;">
                    <span style="font-size: 150px; color: #777;">+</span>
                </div>
            `,

            form: `
                <div class="flex" style="flex-direction: column; min-width: 300px;">
                    <h1>Create a New Project</h1>
                    <form id="new-project-form">
                        <input type="text" name="name" placeholder="Project Name"><br>
                        <textarea name="description" placeholder="Describe your project..."></textarea><br>
                        <button type="submit">Create Project</button>
                    </form>
                </div>
            `,

            create: (e) => {
                ProjectApi.createProject(e.target)
                Project.render()
            },

            cards: (projects) => {
                let projectCards = ``
                for (let project of projects) {
                    projectCards += project.html.card
                }
                return projectCards
            }
        }
        return data
    }

    get html() {
        let data = {
            card: `
                <div class="card" id="project-card-${ this.id }" data-id="${ this.id }">
                    <i class="bi-star" style="font-size: 2rem; color: gold; align-self: flex-end; justify-self: flex-end;"></i>
                    <h3>${ this.name }</h3>
                    <p>Team Size: ${ this.users.length }</p>
                <p>Created By:<br>${ this.creator.firstName } ${ this.creator.lastName }</p>
                </div>
            `,

            back: `
                <div class="flex" style="align-items: center; justify-content: space-between; font-size: 15px; color: #777; flex: 1; padding-right: 15px;">
                    <div id="back-btn"><i class="bi-arrow-bar-left"></i> Back to Projects</div>
                    <div><i class="bi-gear-fill"></i></div>
                </div>
            `
        }
        return data
    }

    get buildTeam() {
        let data = {
            container: `
                <div class="flex" style="width: 100%; flex-direction: column;">
                    <h1 style="text-align: center; color: #3b5ab1; font-size: 50px;">${ this.name }</h1>

                    <h2>Project Description</h2>
                    <div style="text-align: justify; padding: 15px; background-color: #fff; border: solid 1px #ddd;">
                        <i class="bi bi-pencil-square" style="float: right;"></i>
                        ${ this.description }
                    </div>
                    
                    <hr />

                    <h2>Build Your Team</h2>
                    <div id="build-team-container" class="flex" style="flex-direction: row; justify-content: space-around;">
                        <div id="build-team"><h2>All Users</h2>${ User.create.list() }</div>
                        <div class="flex" style="align-items: center; padding: 0px 15px;"><i class="bi bi-arrow-left-right" style="font-size: 30px;"></i></div>
                        <div id="current-team"><h2>Current Team</h2>${ this.currentTeam.list() }</div>
                    </div>
                </div>
            `,

            buildTeamClick: (e, project) => {
                if (e.target.nodeName === "LI") {
                    let user = User.all.find(u => u.id == e.target.id.split("-")[e.target.id.split("-").length-1])
                    let data = { id: user.id, project_id: project.id }
                    
                    UserProjectApi.addUserToProject(data)
                    
                    if (!!project.userIds.find(p => p.id == user.id)) {
                        console.log("User is already assigned to this project.")
                    } else {
                        project.userIds.push({id: user.id})
                    }
                    
                    document.getElementById("current-team").innerHTML = `<h2>Current Team</h2>${ this.currentTeam.list() }`
                    document.getElementById("new-task-select").innerHTML = `<option>Assign to a Team Member</option>${ this.currentTeam.option() }`
                }
            },
            
            currentTeamClick: (e, project) => {
                if (e.target.nodeName === "LI") {
                    let user = User.all.find(u => u.id == e.target.id.split("-")[e.target.id.split("-").length-1])
                    
                    let data = { id: user.id, project_id: project.id }
                    UserProjectApi.removeUserFromProject(data)
            
                    if (!!project.userIds.find(p => p.id == user.id)) {
                        let index = project.userIds.findIndex(p => p.id == user.id)
                        project.userIds.splice(index, 1)
                    } else {
                        console.log("User is not assigned to this project.")
                    }
                    
                    document.getElementById("current-team").innerHTML = `<h2>Current Team</h2>${ this.currentTeam.list() }`
                    document.getElementById("new-task-select").innerHTML = `<option>Assign to a Team Member</option>${ this.currentTeam.option() }`
                }
            }
        }
        return data
    }

    get buildTask() {
        let data = {
            form: `
                <div class="flex" style="flex: 1; flex-direction: column; padding-right: 30px;">
                    <br>
                    <h2>Create a Task</h2>
                    <form id="new-task-form">
                        <input type="text" placeholder="Task Name"><br>
                        <input type="text" placeholder="Task Description"><br>
                        <h3>Deadline</h3>
                        <input type="date">
                        <input type="time">
                        <h3>Assign To</h3>
                        <select id="new-task-select" name="userId"><option>Assign to a Team Member</option>${ this.currentTeam.option() }</select>
                        <button type="submit">Create Task</button>
                    </form>
                </div>

                <div class="flex" id="task-list" style="flex: 1; flex-direction: column;">
                    <br>
                    <h2>Task List</h2>
                    <div id="task-list-items"></div>
                </div>
            `,

            create: (e) => {
                e.preventDefault()

                let data = {
                    name: e.target.children[0].value,
                    description: e.target.children[2].value,
                    deadline: e.target.children[5].value + ' ' + e.target.children[6].value,
                    user_id: parseInt(e.target.children[8].value, 10),
                    project_id: this.id,
                    status: "backlog"
                }
                TaskApi.createTask(data)
            },

            list: () => {
                document.getElementById("task-list-items").innerHTML = ``
                for (let task of this.tasks) {
                    document.getElementById("task-list-items").innerHTML += `<li id="task-${ task.id }">${ task.name } - ${ task.user.firstName } ${ task.user.lastName }</li>`
                }
            }
        }
        return data
    }

    // Click Handling
    static handleDivClick = e => {
        // debugger
        // Create New Project
        if (e.target.id === "new-project-card") {
            content.innerHTML = ``
            this.renderDiv(this.new.form, "new-project")
            // Event Listeners
            document.getElementById("new-project-form").addEventListener("submit", (e)=>{ this.new.create(e) })
        
        // Click on Project Card
        } else if (e.target.classList.contains("card")) {
            content.innerHTML = ``
            let project = Project.all.find(p => p.id == e.target.dataset.id)

            // Render Project Details
            this.renderDiv(project.html.back)
            this.renderDiv(project.buildTeam.container)
            this.renderDiv(project.buildTask.form)
            this.renderDiv(project.buildTask.list())

            // Event Listeners
            document.getElementById("new-task-form").addEventListener("submit", (e) => { project.buildTask.create(e) })
            document.getElementById("build-team").addEventListener("click", (e) => { project.buildTeam.buildTeamClick(e, project) })
            document.getElementById("current-team").addEventListener("click", (e) => { project.buildTeam.currentTeamClick(e, project) })

        // Star Toggle
        } else if (e.target.classList.contains("bi-star")) {
            e.target.classList.remove("bi-star")
            e.target.classList.add("bi-star-fill")
        } else if (e.target.classList.contains("bi-star-fill")) {
            e.target.classList.remove("bi-star-fill")
            e.target.classList.add("bi-star")

        // Back to Projects
        } else if (e.target.id === "back-btn") {
            Project.render()

        // Settings Icon
        } else if (e.target.classList.contains("bi-gear-fill")) {
            alert("Project Settings")

        } else if (e.target.classList.contains("bi-pencil-square")) {
            alert("Edit Project Description")
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
        this.renderDiv(this.new.card, "new-project")

        content.append(`YOUR PROJECTS:`)
        this.renderDiv(this.new.cards(current_user.created_projects), "project-cards")

        content.append(`ASSIGNED PROJECTS:`)
        this.renderDiv(this.new.cards(current_user.assigned_projects),)
    }
}