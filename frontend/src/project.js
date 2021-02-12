class Project {
    static all = []

    constructor({id, name}) {
        this.id = id
        this.name = name
        Project.all.push(this)
    }

    card() {
        let card = document.createElement("div")
        card.classList.add("flex")
        card.classList.add("card")
        card.innerHTML = `
            <h3>${ this.name }</h3>
            <p>${ this.users() }</p>
        `

        return card
    }

    users() {
        return User.all.filter((u) => u.id == this.id)
    }

    static render() {
        let newProject = document.createElement("div")
        newProject.classList.add("flex")
        newProject.classList.add("card")
        newProject.style.justifyContent = "center"
        newProject.style.alignItems = "center"
        newProject.style.fontSize = "150px"
        newProject.innerHTML = "+"
        newProject.addEventListener("click", this.handleNewProject)
        
        content.innerHTML = ``
        content.append(newProject)
        
        for (let p of Project.all) {
            content.append(p.card())
        }
    }

    static handleNewProject = e => {
        let data = `
            <div id="new-project">
                <h1>Create a New Project</h1>
                <input type="text" placeholder="Project Name">
            </div>
        `
        Modal.render(data)
    }

    static newProject() {

    }
}