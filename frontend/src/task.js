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

    static render() {
        content.innerHTML = `TASKS!`
    }
}