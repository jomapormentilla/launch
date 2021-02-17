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

    static get sort() {
        let data = {
            alphabetical: () => {
                let data = []
                for (let project of Project.all) {
                    data.push(project.name)
                }
                data.sort()
                let sorted = []
                for (let i=0; i<data.length; i++) {
                    sorted[i] = Project.all.find(p => p.name === data[i])
                }
                return sorted
            },

            reverse: () => {
                let data = []
                for (let project of Project.all) {
                    data.push(project.name)
                }
                data.sort().reverse()
                let sorted = []
                for (let i=0; i<data.length; i++) {
                    sorted[i] = Project.all.find(p => p.name === data[i])
                }
                return sorted
            }
        }
        return data
    }

    // Calculations
    get taskPercentage() {
        let total = this.tasks.length
        let completed = this.tasks.filter(t => t.status === "completed").length
        let result = (completed/total) * 100

        if (total === 0) {
            return `0.00%`
        } else {
            return result.toFixed(2) + `%`
        }
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
                    <div class="flex back-to-projects"></div>
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

                if (projects.length === 0) {
                    return `<div class="flex" style="background-color: #fff; padding: 10px; width: 100%; justify-content: center;">No Projects Found</div>`
                } else {
                    return projectCards
                }
            },

            back: `
                <div class="flex" style="align-items: center; justify-content: space-between; font-size: 15px; color: #777; flex: 1; padding-right: 15px;">
                    <div id="back-btn"><i class="bi-arrow-bar-left"></i> Back to Projects</div>
                </div>
            `
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
            `
        }
        return data
    }

    get buildTeam() {
        let data = {
            div: `
                <div id="build-team"><h2>All Users</h2>${ User.create.list() }</div>
                <div class="flex" style="align-items: center; padding: 0px 15px;"><i class="bi bi-arrow-left-right" style="font-size: 30px;"></i></div>
                <div id="current-team"><h2>Current Team</h2>${ this.currentTeam.list() }</div>
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
                <form id="new-task-form">
                    <input type="text" placeholder="Task Name">
                    <input type="text" placeholder="Task Description">
                    <h3>Deadline</h3>
                    <input type="date">
                    <input type="time">
                    <h3>Assign To</h3>
                    <select id="new-task-select" name="userId"><option>Assign to a Team Member</option>${ this.currentTeam.option() }</select>
                    <button type="submit">Create Task</button>
                </form>
            `,

            create: (e) => {
                e.preventDefault()

                let data = {
                    name: e.target.children[0].value,
                    description: e.target.children[1].value,
                    deadline: e.target.children[3].value + ' ' + e.target.children[4].value,
                    user_id: parseInt(e.target.children[6].value, 10),
                    project_id: this.id,
                    status: "backlog"
                }
                TaskApi.createTask(data)
            },

            list: () => {
                let html = ``
                for (let task of this.tasks) {
                    let color
                    if (task.status === "backlog") {
                        color = "#aaa";
                    } else if (task.status === "inprogress") {
                        color = "orange"
                    } else if (task.status === "completed") {
                        color = "green"
                    }

                    html += `<tr><td>${ task.name }</td><td>${ task.user.firstName } ${ task.user.lastName }</td><td style="background-color: ${ color }; width: 20px;"></td></tr>`
                }

                if (this.tasks.length === 0) {
                    return `<tr><td style="text-align: center;">This project does not have any tasks yet.</td></tr>`
                } else {
                    return html
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
            content.innerHTML = this.new.form

            // Event Listeners
            document.querySelector(".back-to-projects").innerHTML = this.new.back
            document.getElementById("new-project-form").addEventListener("submit", (e)=>{ this.new.create(e) })
        
        // Click on Project Card
        } else if (e.target.classList.contains("card")) {
            let project = Project.all.find(p => p.id == e.target.dataset.id)

            // Render Project Details
            content.innerHTML = `
                <div class="flex" style="flex-direction: column; width: 100%;">
                    <div class="flex back-to-projects"></div>
                    <div class="flex project-title" style="justify-content: center; color: #3b5ab1; font-size: 50px;">${ project.name }</div>

                    <h2>Project Description</h2>
                    <div class="flex project-description" style="width: 100%; background-color: #fff;">
                        <div style="padding: 15px;">${ project.description }</div>
                    </div>
                    
                    <hr>
                    <h2>Build Your Team</h2>
                    <div class="flex build-team" style="width: 100%; flex-direction: row; justify-content: space-around;"></div>
                    
                    <hr>
                    <div class="flex" style="width: 100%;">
                        <div class="flex col" style="flex: 1; margin-right: 10px;">
                            <h2>Create Tasks</h2>
                            <div class="flex build-task" style="background-color: #fff; padding: 10px;"></div>
                        </div>

                        <div class="flex col" style="flex: 1; margin-left: 10px;">
                            <h2>Current Tasks</h2>
                            <table class="task-list"></table>
                        </div>
                    </div>

                </div>
            `

            // New Manipulations
            document.querySelector(".back-to-projects").innerHTML = this.new.back
            document.querySelector(".build-team").innerHTML = project.buildTeam.div
            document.querySelector(".build-task").innerHTML = project.buildTask.form
            document.querySelector(".task-list").innerHTML = project.buildTask.list()

            // New Event Listeners
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

        } else if (e.target.classList.contains("bi-pencil-square")) {
            alert("Edit Project Description")
        }
    }

    static render() {
        // Initial
        content.innerHTML = `
            <div class="flex" style="flex-direction: column;">
                <h2>Your Projects</h2>
                <div class="flex projects-container">
                    <div class="flex new-project-card"></div>
                    <div class="flex owned-projects"></div>
                </div>

                <h2>Projects Assigned to You</h2>
                <div class="flex assigned-projects"></div>
            </div>
        `

        // Manipulations
        document.querySelector(".new-project-card").innerHTML = this.new.card
        document.querySelector(".owned-projects").innerHTML = this.new.cards(current_user.projects)
        document.querySelector(".assigned-projects").innerHTML = this.new.cards(current_user.assigned_projects)

        // Event Listeners
        content.removeEventListener("click", this.handleDivClick, true)
        content.addEventListener("click", this.handleDivClick)
    }
}