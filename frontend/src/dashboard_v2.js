class Dashboard {
    static get header() {
        let data = {
            profile: `
                <h1>Profile Settings</h1>
                <ul>Feature List
                    <li>Your Projects</li>
                    <li><button id="logout">Logout</div></li>
                </ul>
            `,

            renderProfile: (e) => {
                let profile = document.getElementById("profile")
                profile.style.display = "block"
                profile.style.top = e.pageY + "px"
                profile.style.right = e.offsetX + "px"

                document.getElementById("logout").addEventListener("click", (e)=>{ Login.actions.logout() })
                document.querySelector(".bi-x-circle").addEventListener("click", (e)=>{ profile.style.display = "none" })
            },

            messages: `
                <h1>Your Messages</h1>
            `,

            renderMessages: (e) => {
                Inbox.render()
            },

            renderNotifications: (e) => {
                alert("Notifications - Inside Header Hash")
            },

            greeting: () => {
                let div = document.createElement("div")
                div.innerHTML = `Hello, ${ current_user.firstName }!`
                document.getElementById("nav-container").append(div)
            }
        }
        return data
    }

    static get greeting() {
        let data = {
            div: `
                <div class="flex" id="greeting">
                    <h1>Hello, ${ current_user.firstName }!</h1>
                </div>
            `
        }
        return data
    }

    static get progressLog() {
        let data = {
            div: `
                <div class="flex" id="progress-log">
                    <h2>Progress Log</h2>
                    <div id="prog-log">
                        <div class="progress-log-item">Nothing in the log...</div>
                    </div>
                </div>
            `,
            
            add: (data) => {
                let div = document.createElement("div")
                div.innerHTML = data
                div.classList.add("progress-log-item")
                document.getElementById("prog-log").prepend(div)
            }
        }
        return data
    }

    static get projects() {
        let data = {
            div: `
                <div class="flex" id="project-div">
                    <h2>Projects Overview</h2>
                </div>
            `,

            list: () => {
                if (current_user.projects.length === 0) {
                    document.getElementById("project-div").innerHTML += `<p style="text-align: center;">You have no projects yet.</p>`
                } else {
                    for (let project of current_user.projects) {
                        document.getElementById("project-div").innerHTML += `
                            <div id="project-${ project.id }">
                                <i class="bi bi-caret-down"></i> &nbsp; <span>${ project.name }</span> <span style="float: right;">${ project.taskPercentage }</span>
                                <div class="more-info">${ this.projects.moreInfo(project) }</div>
                            </div>
                        `
                    }
                }
            },

            moreInfo: (project) => {
                let remainingTasks = project.tasks.filter(t => t.status !== "complete")
                let inProgressTasks = project.tasks.filter(t => t.status === "inprogress")
                
                let html = `
                    <table class="project-more-info">
                        <tr><td>Creator</td>
                            <td>${ project.creator.name }</td></tr>
                        <tr><td>Team Size</td>
                            <td>${ project.users.length }</td></tr>
                        <tr><td>Total Tasks Remaining</td>
                            <td>${ remainingTasks.length }</td></tr>
                        <tr><td>Tasks In Progress</td>
                            <td>${ inProgressTasks.length }</td></tr>
                    </table>
                `
                return html
            }
        }
        return data
    }

    // Content Click Handling
    static handleDivClick = e => {
        // Toggle More Info Button
        if (e.target.classList.contains("bi-caret-down")) {
            e.target.classList.remove("bi-caret-down")
            e.target.classList.add("bi-caret-up")
            e.target.parentElement.querySelector(".more-info").style.height = "auto"
            e.target.parentElement.querySelector(".more-info").style.padding = "10px"
        } else if (e.target.classList.contains("bi-caret-up")) {
            e.target.classList.remove("bi-caret-up")
            e.target.classList.add("bi-caret-down")
            e.target.parentElement.querySelector(".more-info").style.height = "0px"
            e.target.parentElement.querySelector(".more-info").style.padding = "0px"

        // Header Handlers
        } else if(e.target.classList.contains("bi-person-circle")) {
            this.header.renderProfile(e)
        } else if(e.target.classList.contains("bi-envelope")) {
            this.header.renderMessages()
        } else if(e.target.classList.contains("bi-bell")) {
            this.header.renderNotifications()
        }
    }

    // Initial Render
    static render() {
        // Template
        content.innerHTML = `
            <div class="flex" style="flex-direction: column; width: 100%;">
                <div class="flex greeting-container" style="width: 100%; background-color: #fff; margin-bottom: 15px;">Hello</div>
                <div class="flex">
                    <div class="flex projects-overview" style="flex: 1; height: fit-content;">Overview</div>
                    <div class="flex progress-log" style="width: 300px; height: fit-content;">Progress Log</div>
                </div>
            </div>
        `

        // Renders
        document.querySelector(".greeting-container").innerHTML = this.greeting.div
        document.querySelector(".projects-overview").innerHTML = this.projects.div
        document.querySelector(".progress-log").innerHTML = this.progressLog.div

        // Manipulations
        document.getElementById("profile-container").innerHTML = current_user.html.profile
        this.projects.list()

        // Event Listener
        content.removeEventListener("click", this.handleDivClick, true)
        content.addEventListener("click", this.handleDivClick)
        document.getElementById("header").addEventListener("click", (e) => { this.handleDivClick(e) })
    }
}