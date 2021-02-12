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

    static render() {
        content.innerHTML = ``
        let sorted = User.all.sort()
        for (let u of sorted) {
            content.append(u.card())
        }
    }

    get tasks() {
        return Task.all.filter((t) => t.userId == this.id)
    }

    get projects() {
        // Project.all.filter((p) => p.users.con)
    }

    get department() {
        return Department.all.filter((d) => d.id == this.department_id)[0].name
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

    static list() {
        let list = User.all.map((u) => {
            return `<li>${ u.firstName } ${ u.lastName }</li>`
        })
        return list
    }
}