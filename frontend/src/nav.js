class Nav {
    static all = []

    constructor({title, src}) {
        this.title = title
        this.src = src
        this.navigation = document.getElementById("navigation")
        
        Nav.all.push(this)
    }

    static seed() {
        let navItems = [
            { title: "Dashboard", src: "dashboard" },
            { title: "Users", src: "users" },
            { title: "Projects", src: "projects" },
            { title: "Your Tasks", src: "tasks" },
            { title: "Inbox", src: "inbox" },
            { title: "About", src: "about" },
        ]

        for (let item of navItems) {
            let newItem = new Nav(item)
            newItem.addToDom()
        }
    }

    render() {
        this.div = document.createElement("div")
        this.div.classList.add("flex")
        this.title === "Dashboard" ? this.div.classList.add("active") : null
        this.div.style.cursor = "pointer"
        this.div.innerText = this.title
        this.div.addEventListener("click", this.handleClick)
        return this.div
    }

    addToDom() {
        this.navigation.append(this.render())
    }

    handleClick = e => {
        for (let i of this.navigation.querySelectorAll("div")) {
            i.classList.remove("active")
        }
        this.div.classList.add("active")
        this.render_content(this.src)
    }

    render_content(data) {
        content.style.opacity = 0
        setTimeout(()=>{ 
            content.style.opacity = 1 
            switch (data) {
                case 'dashboard':
                    DepartmentApi.getDepartments()
                    Dashboard.render()
                    break
                case 'users':
                    UserApi.getUsers()
                    User.render()
                    break
                case 'projects':
                    ProjectApi.getProjects()
                    Project.render()
                    break
                case 'tasks':
                    TaskApi.getTasks()
                    Task.render()
                    break
                case 'inbox':
                    Inbox.render()
                    break
                case 'about':
                    About.render()
                    break
            }
        }, 250)
    }
}