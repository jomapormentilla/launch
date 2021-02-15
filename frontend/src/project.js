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
        let projectUsers = ``
        for (let user of this.users) {
            projectUsers += `<li id="${ user.id }">${ user.firstName } ${ user.lastName } - ${ user.department }</li>`
        }
        return `${ projectUsers }`
    }

    static get new() {
        let data = {
            card: `
                <div class="flex card" id="new-project-card" style="justify-content: center; align-items: center; flex-direction: column;">
                    <span style="font-size: 150px; color: #777;">+</span>
                </div>
            `,
            form: `
                <h1>Create a New Project</h1>
                <form id="new-project-form">
                    <input type="text" name="name" placeholder="Project Name"><br>
                    <textarea name="description" placeholder="Describe your project..."></textarea><br>
                    <button type="submit">Create Project</button>
                </form>
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
                    <p>Users: ${ this.users.length }</p>
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
        let html = {
            container: `
                <div class="flex" style="width: 100%; flex-direction: column;">
                    <h1 style="text-align: center; color: #3b5ab1; font-size: 50px;">${ this.name }</h1>

                    <h2>Project Description</h2>
                    <div style="text-align: justify; padding: 15px; background-color: #fff; border: solid 1px #ddd;">${ this.description }</div>
                    <hr />

                    <h2>Build Your Team</h2>
                    <div id="build-team-container" class="flex" style="flex-direction: row; justify-content: flex-start;">
                        <div id="build-team"><h2>All Users</h2>${ User.list() }</div>
                        <div class="flex" style="align-items: center; padding: 0px 15px;"><i class="bi bi-arrow-left-right" style="font-size: 30px;"></i></div>
                        <div id="current-team"><h2>Current Team</h2>${ this.currentTeam }</div>
                    </div>
                </div>
            `,
            buildTeamClick: (e, project) => {
                if (e.target.nodeName === "LI") {
                    let user = User.all.find(u => u.id == e.target.id.split("-")[e.target.id.split("-").length-1])
                    user.addToProject(project.id)
                    if (!!project.userIds.find(p => p.id == user.id)) {
                        console.log("User is already assigned to this project.")
                    } else {
                        project.userIds.push({id: user.id})
                    }
                    
                    document.getElementById("current-team").innerHTML = `<h2>Current Team</h2>${ this.currentTeam }`
                }
            },
            currentTeamClick: (e, project) => {
                if (e.target.nodeName === "LI") {
                    let user = User.all.find(u => u.id == e.target.id.split("-")[e.target.id.split("-").length-1])
                    user.removeFromProject(project.id)
            
                    if (!!project.userIds.find(p => p.id == user.id)) {
                        let index = project.userIds.findIndex(p => p.id == user.id)
                        project.userIds.splice(index, 1)
                    } else {
                        console.log("User is not assigned to this project.")
                    }
                    
                    document.getElementById("current-team").innerHTML = `<h2>Current Team</h2>${ this.currentTeam }`
                }
            }
        }
        return html
    }

    // Click Handling
    static handleDivClick = e => {
        // Create New Project
        if (e.target.id === "new-project-card") {
            content.innerHTML = ``
            this.renderDiv(this.new.form, "new-project")
            // Event Listeners
            document.getElementById("new-project-form").addEventListener("submit", (e)=>{
                ProjectApi.createProject(e.target)
                Project.render()
            })
        
        // Click on Project Card
        } else if (e.target.classList.contains("card")) {
            content.innerHTML = ``
            let project = Project.all.find(p => p.id == e.target.dataset.id)
            this.renderDiv(project.html.back)
            this.renderDiv(project.buildTeam.container)
            // Event Listeners
            document.getElementById("build-team").addEventListener("click", (e) => {project.buildTeam.buildTeamClick(e, project)})
            document.getElementById("current-team").addEventListener("click", (e) => {project.buildTeam.currentTeamClick(e, project)})

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
        content.innerHTML = ``
        
        let projectCards = ``
        for (let project of current_user.created_projects) {
            projectCards += project.html.card
        }

        this.renderDiv(this.new.card, "new-project")
        this.renderDiv(projectCards, "project-cards")
    }
}