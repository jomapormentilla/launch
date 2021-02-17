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

    static get sort() {
        let data = {
            alphabetical: () => {
                let data = []
                for (let user of User.all) {
                    data.push(user.email)
                }
                data.sort()
                let sorted = []
                for (let i=0; i<data.length; i++) {
                    sorted[i] = User.all.find(u => u.email === data[i])
                }
                return sorted
            },

            reverse: () => {
                let data = []
                for (let user of User.all) {
                    data.push(user.email)
                }
                data.sort().reverse()
                let sorted = []
                for (let i=0; i<data.length; i++) {
                    sorted[i] = User.all.find(u => u.email === data[i])
                }
                return sorted
            }
        }
        return data
    }

    // Etc
    get name() {
        return `${ this.firstName } ${ this.lastName }`
    }

    get profile() {
        let data = {
            render: () => {
                content.innerHTML = `
                    <div class="flex col user-profile">
                        <h1>${ this.name }</h1>
                        <p>Email: ${ this.email }</p>
                    </div>
                `
            }
        }
        return data
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
                let html = ``
                for (let user of User.sort.alphabetical()) {
                    html += user.html.row
                }
                return html
            },

            cards: () => {
                let cards = ``
                for (let user of User.sort.alphabetical()) {
                    cards += user.html.card
                }
                return cards
            },

            list: () => {
                let data = ``
                for (let user of User.sort.alphabetical()) {
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
        if (e.target.id.includes("user-row")) {
            let user = User.all.find(u => u.id == e.target.id.split("-")[2])
            user.profile.render()
        }
    }

    static render() {
        // Initial
        content.innerHTML = `
            <div class="flex col" style="width: 100%;">
                <h1 style="text-align: center;">Users</h1>
                <div id="users-table"></div>
            </div>
        `

        // Manipulators
        document.getElementById("users-table").innerHTML = this.create.table()

        // Event Listeners
        content.removeEventListener("click", this.handleDivClick, true)
        content.addEventListener("click", this.handleDivClick)
    }
}