class Task {
    static all = []

    constructor({id, name, description, deadline, user_id, project_id}) {
        this.id = id
        this.name = name
        this.description = description
        this.deadline = deadline
        this.userId = user_id
        this.projectId = project_id

        Task.all.push(this)
    }

    get user() {
        return User.all.find(u => u.id == this.userId)
    }

    get project() {
        return Project.all.find(p => p.id == this.projectId)
    }

    static render() {
        content.innerHTML = `TASKS!`
    }
}