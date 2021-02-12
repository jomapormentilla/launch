class Project {
    static all = []

    constructor({name}) {
        this.name = name
        Project.all.push(this)
    }

    static render() {
        content.innerHTML = 'PROJECTS!'
    }
}