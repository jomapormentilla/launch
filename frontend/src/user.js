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

    // Associations
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

    // HTML Div Elements
    get html() {
        let data = {
            card: `
                <div class="card" id="user-card-${ this.id }">
                    <i class="bi-person-plus" style="font-size: 2rem; color: #3b5ab1; align-self: flex-end; justify-self: flex-end;"></i>
                    <h3>${ this.firstName } ${ this.lastName }</h3>
                    <p>${ this.department }</p>
                    <p>Tasks: ${ this.tasks.length }</p>
                </div>
            `,
            list: `<li id="user-list-${ this.id }">${ this.firstName } ${ this.lastName } - ${ this.department }</li>`,
            option: `<option value="${ this.id }">${ this.firstName } ${ this.lastName }</option>`
        }
        return data
    }

    // Click Handling
    static handleDivClick = e => {
        // debugger
        
    }

    // Rendering Functions
    static renderDiv(html, id) {
        let div = document.createElement("div")
        div.dataset.id = id
        div.classList.add("flex")
        div.style.minWidth = "100%"
        div.innerHTML += html

        content.append(div)
        div.addEventListener("click", this.handleDivClick)
    }

    static render() {
        content.innerHTML = ``
        
        let cards = ``
        for (let user of User.all) {
            cards += user.html.card
        }

        content.innerHTML += `<h2>Users</h2>`
        this.renderDiv(cards, "user-cards")
    }
}