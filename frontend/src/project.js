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

    card() {
        let card = document.createElement("div")
        card.classList.add("card")
        card.dataset.id = this.id
        card.innerHTML = `
            <i class="bi-star" style="font-size: 2rem; color: gold; align-self: flex-end; justify-self: flex-end;"></i>
            <h3 style="text-align: center;">${ this.name }</h3>
        `
        card.addEventListener("click", this.handleCardClick)
        return card
    }

    handleCardClick = e => {
        this.starToggle(e)
        this.projectClick(e)
    }

    projectClick = e => {
        if (e.target.classList.contains("card")) {
            this.renderBuildTeam()
        }
    }

    renderBuildTeam() {
        let data = {
            innerHTML: `
                <div class="flex" style="align-items: center; justify-content: space-between; font-size: 15px; color: #777; flex: 1; padding-right: 15px;">
                    <div><i class="bi-arrow-bar-left"></i> Back to Projects</div>
                    <div><i class="bi-gear-fill"></i></div>
                </div>
                <div class="flex" style="width: 100%; flex-direction: column;">
                    <h1 style="text-align: center; color: #3b5ab1;">${ this.name }</h1>
                    <div style="text-align: justify; padding: 15px; background-color: #fff; border: solid 1px #ddd;">${ this.description }</div>
                    <hr />

                    <h2>Build Your Team</h2>
                    <div id="build-team-container" class="flex" style="flex-direction: row; justify-content: center;">
                        <div id="build-team"><h2>All Users</h2>${ User.list() }</div>
                        <div class="flex" style="align-items: center; padding: 0px 15px;"><i class="bi bi-arrow-left-right" style="font-size: 30px;"></i></div>
                        ${ this.renderCurrentTeam }
                    </div>
                </div>
            `,
            justifyContent: `center`
        }
        content.innerHTML = data.innerHTML

        document.getElementById("build-team").addEventListener("click", (e) => {this.handleBuildTeamClick(e, this)})

        content.querySelector("div").addEventListener("click", (e) => { 
            if (e.target.innerText.includes("Back to Projects")) {
                Project.render() 
            } else if (e.target.classList.contains("bi-gear-fill")) {
                this.projectSettings()
            }
        })
    }

    get renderCurrentTeam() {
        let projectUsers = ``
        for (let user of this.users) {
            projectUsers += `<li>${ user.firstName } ${ user.lastName } - ${ user.department }</li>`
        }
        return `<div id="current-team"><h2>Current Team</h2>${ projectUsers }</div>`
    }

    handleBuildTeamClick = (e, project) => {
        if (e.target.nodeName === "LI") {
            let user = User.all.find(u => u.id == e.target.id)
            user.addToProject(project.id)
            if (!!project.userIds.find(p => p.id == user.id)) {
                Error.render("User is already assigned to this project.")
            } else {
                project.userIds.push({id: user.id})
            }
    
            project.renderBuildTeam()
        }
    }

    projectSettings() {
        alert("Settings!")
    }

    renderProject() {

    }

    starToggle = e => {
        if (e.target.classList.contains("bi-star")) {
            e.target.classList.remove("bi-star")
            e.target.classList.add("bi-star-fill")
        } else if (e.target.classList.contains("bi-star-fill")) {
            e.target.classList.remove("bi-star-fill")
            e.target.classList.add("bi-star")
        }
    }

    static newProjectCard = () => {
        let newProject = document.createElement("div")
        newProject.classList.add("flex")
        newProject.classList.add("card")
        newProject.style.justifyContent = "center"
        newProject.style.alignItems = "center"
        newProject.style.flexDirection = "column"
        newProject.innerHTML += `<span style="font-size: 150px; color: #777;">+</span>`
        newProject.addEventListener("click", this.newProjectForm)

        return newProject
    }

    static newProjectForm = e => {
        let data = {
            innerHTML: `
                <div class="flex" id="new-project">
                    <h1>Create a New Project</h1>
                    <form id="new-project-form">
                        <input type="text" name="name" placeholder="Project Name"><br>
                        <textarea name="description" placeholder="Describe your project..."></textarea><br>
                        <button type="submit">Create Project</button>
                    </form>
                </div>    
            `,
            justifyContent: 'flex-start'
        }
        
        content.innerHTML = data.innerHTML
        // Modal.render(data)
        document.getElementById("new-project-form").addEventListener("submit", this.handleSubmitNewProject)
    }

    static handleSubmitNewProject = e => {
        e.preventDefault()
        ProjectApi.createProject(e.target)
        
        document.querySelector(".backdrop").style.opacity = 0
        setTimeout(()=>{ document.querySelector(".backdrop").remove() }, 1000)
    }

    static render() {
        let newProject = this.newProjectCard()
        content.innerHTML = ``
        content.append(newProject)
        
        for (let p of current_user.created_projects) {
            content.append(p.card())
        }
    }
}