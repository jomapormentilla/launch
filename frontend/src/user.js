class User {
    static all = []

    constructor({id, first_name, last_name, email, department_id}) {
        this.id = id
        this.firstName = first_name
        this.lastName = last_name
        this.email = email
        this.department_id = department_id

        User.all.push(this)
    }

    get tasks() {
        return Task.all.filter(t => t.userId == this.id)
    }

    get assigned_projects() {
        return Project.all.filter(p => p.users.includes(current_user))
    }

    get created_projects() {
        return Project.all.filter(p => p.creatorId == current_user.id)
    }

    get department() {
        return Department.all.find(d => d.id == this.department_id).name
    }

    get project() {
        return Project.all.find(p => p.creatorId == this.id)
    }

    card() {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <i class="bi-person-plus" style="font-size: 2rem; color: #3b5ab1; align-self: flex-end; justify-self: flex-end;"></i>
            <h3>${ this.firstName } ${ this.lastName }</h3>
            <p>${ this.department }</p>
            <p>Tasks: ${ this.tasks.length }</p>
        `
        return card
    }

    addToProject(projectId) {
        let data = {
            id: this.id,
            project_id: projectId
        }

        UserApi.updateUser(data)
    }

    static list() {
        let list = ``
        for (let user of User.all) {
            list += `<li id="${ user.id }">${ user.firstName } ${ user.lastName } - ${ user.department }</li>`
        }
        return list
    }

    static render() {
        content.innerHTML = ``
        let sorted = User.all.sort()
        for (let u of sorted) {
            content.append(u.card())
        }
    }
}