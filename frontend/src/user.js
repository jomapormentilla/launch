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
        return Project.all.filter(p => { return p.users.includes(current_user) && p.creator !== current_user })
    }

    get created_projects() {
        return Project.all.filter(p => p.creatorId == current_user.id)
    }

    get projects() {
        return Project.all.filter(p => { return p.users.includes(current_user) || p.creatorId == current_user.id })
    }

    get department() {
        return Department.all.find(d => d.id == this.department_id).name
    }

    // Etc
    get name() {
        return `${ this.firstName } ${ this.lastName }`
    }

    // HTML Div Elements
    get html() {
        let data = {
            row: `
                <div id="user-row-${ this.id }">
                    <i class="bi-person-plus" style="font-size: 2rem; color: #3b5ab1;"></i> &nbsp; - &nbsp;
                    ${ this.name }
                    <div class="more-info"></div>
                </div>
            `,
            card: `
                <div class="card" id="user-card-${ this.id }">
                    <i class="bi-person-plus" style="font-size: 2rem; color: #3b5ab1; align-self: flex-end; justify-self: flex-end;"></i>
                    <h3>${ this.firstName } ${ this.lastName }</h3>
                    <p>${ this.department }</p>
                    <p>Tasks: ${ this.tasks.length }</p>
                </div>
            `,
            list: `
                <li id="user-list-${ this.id }">${ this.firstName } ${ this.lastName } - ${ this.department }</li>
            `,
            option: `
                <option value="${ this.id }">${ this.firstName } ${ this.lastName }</option>
            `,
            profile: `
                <div id="profile">
                    <i class="bi bi-x-circle" style="float: right;"></i>
                    <br>
                    <h3>${ this.email }</h3>
                    <button id="logout">Logout</button>
                </div>
            `
        }
        return data
    }

    static get create() {
        let data = {
            table: () => {
                for (let user of User.all.sort((a,b) => a - b)) {
                    document.getElementById("users-table").innerHTML += user.html.row
                }
            },

            cards: () => {
                let cards = ``
                for (let user of User.all) {
                    cards += user.html.card
                }
                return cards
            },

            list: () => {
                let data = ``
                for (let user of User.all) {
                    data += `<li id="user-list-${ user.id }">${ user.firstName } ${ user.lastName } - ${ user.department }</li>`
                }
                return data

            }
        }
        return data
    }

    static get actions() {
        let data = {
            moreInfo: () => {
                let html = `
                    <h3>More Info!</h3>                
                `
                return html
            }
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
        div.id = id
        div.classList.add("flex")
        div.style.minWidth = "100%"
        div.innerHTML += html

        content.append(div)
        div.addEventListener("click", this.handleDivClick)
    }

    static render() {
        // Initial
        content.innerHTML = ``

        // Main Renders
        content.innerHTML += `
            <h2>Users</h2>
            <div id="users-table"></div>
        `
        this.create.table()
    }
}