class Project {
    static all = []

    constructor({id, name}) {
        this.id = id
        this.name = name
        Project.all.push(this)
    }

    card() {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <i class="bi-star" style="font-size: 2rem; color: gold; align-self: flex-end; justify-self: flex-end;"></i>
            <h3>${ this.name }</h3>
            <p>${ this.users }</p>
            
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
                innerHTML: `<h1>${ this.name }</h1>`,
                justifyContent: `center`
            }
            Modal.render(data)
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

    get users() {
        return User.all.filter((u) => u.id == this.id)
    }

    static render() {
        let newProject = this.newProjectCard()
        content.innerHTML = ``
        content.append(newProject)
        
        for (let p of Project.all) {
            content.append(p.card())
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
                        <input type="text" placeholder="Project Name"><br>
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
}