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
        return Project.sort.alphabetical().filter(p => { return p.users.includes(current_user) && p.creator !== current_user })
    }

    get created_projects() {
        return Project.sort.alphabetical().filter(p => p.creatorId == current_user.id)
    }

    get projects() {
        return Project.sort.alphabetical().filter(p => { return p.users.includes(current_user) || p.creatorId == current_user.id })
    }

    get projects_by_others() {
        return Project.sort.alphabetical().filter(p => { return p.creator.id !== this.id && !p.users.includes(this) })
    }

    get department() {
        return Department.all.find(d => d.id == this.department_id).name
    }

    static sortby(key) {
        debugger
        if (typeof(User.all[0][key]) === "number") {
            return User.all.sort((u1, u2) => {
                return u1[key] - u2[key]
            })

        } else if (typeof(User.all[0][key]) === "string") {
            return User.all.sort((u1, u2) => {
                let n1 = u1[key].toUpperCase()
                let n2 = u2[key].toUpperCase()

                if (n1 < n2) {
                    return -1
                } else if (n1 > n2) {
                    return 1
                }
                return 0
            })
        }
    }

    static search(term) {
        return User.sort.alphabetical().filter(u => { return u.firstName.includes(term) || u.lastName.includes(term) || u.email.includes(term) })
    }

    // Etc
    get name() {
        return `${ this.firstName } ${ this.lastName }`
    }

    get profile() {
        let data = {
            render: () => {
                content.innerHTML = `
                    <div class="flex col user-profile" style="background-color: #fff; padding: 15px; width: 100%;">
                        ${ User.actions.back }
                        <h1>${ this.name }</h1>
                        <div>
                            <table class="user-profile">
                                <tr><td>Email: </td><td> ${ this.email }</td><tr>
                                <tr><td>Tasks: </td><td> ${ this.tasks.length }</td><tr>
                            </table>
                        </div>
                    </div>
                `

                document.getElementById("back-to-users").addEventListener("click", this.profile.goBack)
            },

            goBack: (e) => {
                User.render()
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
            table: (arr) => {
                let html = ``
                for (let user of arr) {
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
            },

            back: `
                <div class="flex" style="align-items: center; justify-content: space-between; font-size: 15px; color: #777; flex: 1; padding-right: 15px;">
                    <div id="back-to-users"><i class="bi-arrow-bar-left"></i> Back to Users</div>
                </div>
            `,

            filter: (e) => {
                document.getElementById("users-table").innerHTML = ``
                let term = e.target.value
                let arr = this.search(term)
                
                document.getElementById("users-table").innerHTML = this.create.table(arr)
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
                <h1 style="color: #fff; text-align: center; font-size: 35px;">Users</h1>
                <input type="search" class="user-search" placeholder="Search for a user...">
                <div id="users-table"></div>
            </div>
        `

        // Manipulators
        document.getElementById("users-table").innerHTML = this.create.table(User.sort.alphabetical())

        // Event Listeners
        content.removeEventListener("click", this.handleDivClick, true)
        content.addEventListener("click", this.handleDivClick)
        document.querySelector(".user-search").addEventListener("keyup", this.actions.filter)
    }
}