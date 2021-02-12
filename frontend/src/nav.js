class Nav {
    navigation = document.getElementById("navigation")
    static all = []

    constructor({title, src}) {
        this.title = title
        this.src = src
        Nav.all.push(this)
    }

    static seed() {
        let navItems = [
            { title: "Dashboard", src: "dashboard" },
            { title: "Users", src: "users" },
            { title: "Projects", src: "projects" }
        ]

        for (let item of navItems) {
            let newItem = new Nav(item)
            newItem.addToDom()
        }
    }

    render() {
        this.div = document.createElement("div")
        this.div.classList.add("flex")
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

        Content.render(this.src)
    }
}