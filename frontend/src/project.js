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
        return Task.sortby("status").filter(t => t.projectId === this.id)
    }

    get comments() {
        return Comment.all.filter(c => c.type === "Project" && c.typeId === this.id)
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

    static sortby(key) {
        if (typeof(Project.all[0][key]) === "number") {
            return Project.all.sort((u1, u2) => {
                return u1[key] - u2[key]
            })

        } else if (typeof(Project.all[0][key]) === "string") {
            return Project.all.sort((u1, u2) => {
                let n1 = u1[key].toUpperCase()
                let n2 = u2[key].toUpperCase()

                if (n1 < n2) {
                    return -1
                } else if (n1 > n2) {
                    return 1
                }
                return 0
            })
        }
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
                    <h1 style="color: #fff;">Create a New Project</h1>
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
                    <div class="back-btn"><i class="bi-arrow-bar-left"></i> Back to Projects</div>
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
                <form id="new-task-form" class="flex" style="width: 100%;">
                    <div class="flex col" style="flex: 1; margin-right: 10px;">
                        <h3>Name</h3>
                        <input type="text" name="name" placeholder="Task Name">
                        <h3>Description</h3>
                        <textarea type="text" name="description" placeholder="Task Description" style="height: 150px;"></textarea>
                    </div>

                    <div class="flex col" style="flex: 1; margin-left: 10px;">
                        <h3>Deadline</h3>
                        <input name="date" type="date">
                        <input name="time" type="time" value="10:00:00">

                        <h3>Assign To</h3>
                        <select id="new-task-select" name="userId"><option>Assign to a Team Member</option>${ this.currentTeam.option() }</select>
                    </div>

                    <button type="submit" style="margin-top: 10px;">Create Task</button>
                </form>
            `,

            create: (e) => {
                e.preventDefault()
                
                let data = {
                    name: e.target.name.value,
                    description: e.target.description.value,
                    deadline: e.target.date.value + ' ' + e.target.time.value,
                    user_id: parseInt(e.target.userId.value, 10),
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

    static createComment(project) {
        let html = ``
        for (let comment of project.comments.reverse()) {
            html += `
                <div class="task-comment">
                    <p><strong>${ comment.user.name }</strong><br><span style="color: #777;">${ comment.date }</span></p>
                    <p>${ comment.content }</p>
                </div>
            `
        }

        if (project.comments.length === 0) {
            document.querySelector(".project-comments").innerHTML = `<div style="text-align: center;">This project does not have any comments.</div>`    
        } else {
            document.querySelector(".project-comments").innerHTML = html
        }
    }

    static handleProjectComment = e => {
        e.preventDefault()

        let data = {
            content: e.target.content.value,
            type: "Project",
            id: e.target.projectId.value
        }

        CommentApi.createComment(data)
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
                    <div class="flex project-title" style="justify-content: center; color: #fff; font-size: 50px;">${ project.name }</div>

                    <br>
                    <p style="color: #fff; text-align: center;">Creator: <u>${ project.creator.name }</u></p>
                    <p style="color: #fff; text-align: center;">${ project.description }</p>
                    
                    <br>
                    <h2 style="color: #ddd;">Build Your Team</h2>
                    <div class="flex build-team" style="width: 100%; flex-direction: row; justify-content: space-around;"></div>
                    
                    <br>
                    <h2>Create Tasks</h2>
                    <div class="flex build-task" style="background-color: #fff; padding: 10px;"></div>

                    <br>
                    <h2>Current Tasks <small class="task-count">(${ project.tasks.length })</small></h2>
                    <table class="task-list"></table>

                    <h2>Comments:</h2>
                    <form id="project-comment-form">
                        <input type="hidden" name="projectId" value="${ project.id }">
                        <textarea name="content" placeholder="${ current_user.firstName } says..."></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <div class="flex col project-comments"></div>
                </div>
            `

            // New Manipulations
            document.querySelector(".back-to-projects").innerHTML = this.new.back
            document.querySelector(".build-team").innerHTML = project.buildTeam.div
            document.querySelector(".build-task").innerHTML = project.buildTask.form
            document.querySelector(".task-list").innerHTML = project.buildTask.list()
            this.createComment(project)

            // New Event Listeners
            document.getElementById("new-task-form").addEventListener("submit", (e) => { project.buildTask.create(e) })
            document.getElementById("build-team").addEventListener("click", (e) => { project.buildTeam.buildTeamClick(e, project) })
            document.getElementById("current-team").addEventListener("click", (e) => { project.buildTeam.currentTeamClick(e, project) })
            document.getElementById("project-comment-form").addEventListener("submit", this.handleProjectComment)

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
                <h2 style="color: #fff;">Your Projects</h2>
                <div class="flex projects-container">
                    <div class="flex new-project-card"></div>
                    <div class="flex owned-projects"></div>
                </div>

                <h2 style="color: #aaa;">Projects Assigned to You</h2>
                <div class="flex assigned-projects"></div>
                
                <h2 style="color: #333;">Projects By Other Users</h2>
                <div class="flex other-projects"></div>
            </div>
        `

        // Manipulations
        document.querySelector(".new-project-card").innerHTML = this.new.card
        document.querySelector(".owned-projects").innerHTML = this.new.cards(current_user.projects)
        document.querySelector(".assigned-projects").innerHTML = this.new.cards(current_user.assigned_projects)
        document.querySelector(".other-projects").innerHTML = this.new.cards(current_user.projects_by_others)

        // Event Listeners
        content.removeEventListener("click", this.handleDivClick, true)
        content.addEventListener("click", this.handleDivClick)
    }
}