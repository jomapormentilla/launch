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

    card() {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <i class="bi-star" style="font-size: 2rem; color: gold; align-self: flex-end; justify-self: flex-end;"></i>
            <h3>${ this.name }</h3>   
        `
        card.addEventListener("click", this.handleCardClick)
        return card
    }

    handleCardClick = e => {
        this.starToggle(e)
        this.projectClick(e)
    }

    projectClick = (e) => {
        if (e.target.classList.contains("card")) {
            let data = {
                innerHTML: `
                    <div class="flex" style="align-items: center; justify-content: space-between; font-size: 15px; color: #777; flex: 1; padding-right: 15px;">
                        <div><i class="bi-arrow-bar-left"></i> Back to Projects</div>
                        <div><i class="bi-gear-fill"></i></div>
                    </div>
                    <div class="flex" style="width: 100%; flex-direction: column;">
                        <h1 style="text-align: center;">${ this.name }</h1>
                        <p style="text-align: justify; padding: 0px 15px;">${ this.description }</p>
                        <hr />
                        <div class="flex" style="width: 100%; flex-direction: row; flex-wrap: wrap;">
                            <div class="flex box"><h3>Team Members</h3></div>
                            <div class="flex box"><h3>Progress</h3></div>
                            <div class="flex box"><h3>Messages</h3></div>
                        </div>

                        <h2>Build Your Team</h2>
                        <div class="flex" style="width: 100%; flex-direction: row; flex-wrap: wrap;">
                            <div class="flex box"><h3>Search Departments</h3></div>
                        </div>
                    </div>
                `,
                justifyContent: `center`
            }
            content.innerHTML = data.innerHTML
            content.querySelector("div").addEventListener("click", (e) => { 
                if (e.target.innerText.includes("Back to Projects")) {
                    Project.render() 
                } else if (e.target.classList.contains("bi-gear-fill")) {
                    alert("Settings!")
                }
            })
        }
    }

    starToggle = (e) => {
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
                <div id="new-project">
                    <h1>Create a New Project</h1>
                    <form id="new-project-form">
                        <input type="text" placeholder="Project Name"><br><br>
                        <button type="submit">Create Project</button>
                    </form>
                </div>    
            `,
            justifyContent: 'flex-start'
        }
        
        Modal.render(data)
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
        
        for (let p of Project.all) {
            content.append(p.card())
        }
    }
}