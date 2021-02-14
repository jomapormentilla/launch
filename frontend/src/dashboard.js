class Dashboard {
    static handleHeaderClick = e => {
        if (e.target.classList.contains("bi-person-circle")) {
            this.profileClick()
        } else if (e.target.classList.contains("bi-envelope")) {
            alert("Messages!")
        }
    }

    static profileClick() {
        let data = {
            innerHTML: `
                <h1>Profile Settings</h1>
                <ul>Feature List
                    <li>Your Projects</li>
                    <li><button id="logout">Logout</div></li>
                </ul>
            `,
            justifyContent: `flex-end`
        }
        Modal.render(data)
        document.getElementById("logout").addEventListener("click", (e) => { Login.logout() })
    }

    static renderProjects(data) {
        let html = ``
        for (let p of data) {
            html += `<div class="card">${ p.name }</div>`
        }
        return html
    }

    static addToProgressLog(data) {
        let div = document.createElement("div")
        div.innerHTML = data
        div.classList.add("progress-log-item")
        document.getElementById("prog-log").prepend(div)
    }

    static removeErrors() {
        if (document.querySelectorAll(".error")) {
            for (let err of document.querySelectorAll(".error")) {
                err.remove()
            }
        }
    }

    static render() {
        document.getElementById("header").addEventListener("click", this.handleHeaderClick)
        content.innerHTML = `
            <div class="flex" style="flex-direction: column; flex: 3;">
                <h2>Created Projects:</h2>
                <div class="flex" style="flex-direction: row; flex-wrap: wrap;">
                    ${ this.renderProjects(current_user.created_projects) }
                </div>

                <h2>Assigned Projects:</h2>
                <div class="flex" style="flex-direction: row; flex-wrap: wrap;">
                    ${ this.renderProjects(current_user.assigned_projects) }
                </div>

                <h2>Assigned Tasks:</h2>
                <div class="flex" style="flex-direction: row; flex-wrap: wrap;">
                    <p>Render Current User's Tasks Here...</p>
                </div>
            </div>

            <div class="flex" id="progress-log">
                <h2>Progress Log</h2>
                <div id="prog-log">
                    <div class="progress-log-item">Nothing in the log...</div>
                </div>
            </div>
        `
    }
}