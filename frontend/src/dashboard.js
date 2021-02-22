class Dashboard {
    static get header() {
        let data = {
            renderProfile: (e) => {
                let profile = document.getElementById("profile")
                profile.style.display = "block"
                profile.style.top = e.pageY + "px"
                profile.style.right = e.offsetX + "px"

                document.getElementById("logout").addEventListener("click", (e)=>{ Login.actions.logout() })
                document.querySelector(".bi-x-circle").addEventListener("click", (e)=>{ profile.style.display = "none" })
            },

            renderMessages: (e) => {
                let nav = Nav.all.find(n => n.title === "Inbox")
                for (let i of document.getElementById("navigation").querySelectorAll("div")) {
                    i.classList.remove("active")
                }
                nav.div.classList.add("active")
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
            div: `<h1 style="font-size: 35px;">Hello, ${ current_user.firstName }!</h1>`
        }
        return data
    }

    static get progressLog() {
        let data = {
            div: `
                <div class="flex" id="progress-log">
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
                <div class="flex" id="project-div"></div>
            `,

            list: () => {
                if (current_user.projects.length === 0) {
                    document.getElementById("project-div").innerHTML += `<p style="text-align: center;">You have no projects yet.</p>`
                } else {
                    for (let project of current_user.projects) {
                        document.getElementById("project-div").innerHTML += `
                            <div id="project-${ project.id }">
                                <i class="bi bi-caret-down"></i> &nbsp; <span>${ project.name }</span> <span style="float: right;">${ project.taskPercentage } Complete</span>
                                <div class="more-info">${ this.projects.moreInfo(project) }</div>
                            </div>
                        `
                    }
                }
            },

            moreInfo: (project) => {
                let remainingTasks = project.tasks.filter(t => t.status !== "completed")
                let completedTasks = project.tasks.filter(t => t.status === "completed")
                
                let html = `
                    <h3>Details</h3>
                    <table class="project-more-info">
                        <tr><td>Creator</td>
                            <td>${ project.creator.name }</td></tr>
                        <tr><td>Team Size</td>
                            <td>${ project.users.length }</td></tr>
                        <tr><td>Tasks Remaining</td>
                            <td>${ remainingTasks.length }</td></tr>
                        <tr><td>Tasks Completed</td>
                            <td>${ completedTasks.length }</td></tr>
                    </table>

                    <h3>Task List</h3>
                    <table class="task-list" style="border: solid 1px #aaa;">${ project.buildTask.list() }</table>
                `
                return html
            }
        }
        return data
    }

    static get upcoming() {
        let data = {
            div: `
                <div class="flex" id="upcoming-div"></div>
            `,

            tasks: () => {
                let today = new Date()
                let threeDays = new Date(today.setDate(today.getDate() + 3))
                let tasks = Task.all.filter(t => t.user === current_user && t.deadline >= new Date() && t.deadline <= threeDays )

                if (tasks.length === 0) {
                    document.getElementById("upcoming-div").innerHTML = `You don't have any assigned tasks yet.`
                } else {
                    for (let task of tasks) {
                        document.getElementById("upcoming-div").innerHTML += `
                            <li>
                                <u>${ task.name }</u> - ${ task.description }
                                <p style="color: #777;">
                                    Project: ${ task.project.name }<br>
                                    Deadline: ${ task.due_date }
                                </p>
                            </li>
                        `
                    }
                }
            }
        }
        return data
    }

    static handleScroll = e => {
        for (let h2 of document.querySelectorAll("h2")) {
            if (h2.offsetTop > 500) {
                h2.style.color = "#000"
            } else {
                h2.style.color = "#fff"
            }
        }
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
            <div class="flex col" style="width: 100%;">
                <div class="flex greeting-container"></div>
                <div class="flex" style="width: 100%;">
                    <div class="flex col" style="flex: 1;">
                        <h2 style="color: #fff;">Projects Overview</h2>
                        <div class="flex projects-overview" style="flex: 1; height: fit-content;"></div>
                    </div>

                    <div class="flex col">
                        <h2 style="color: #fff; margin-left: 15px;">Upcoming Tasks</h2>
                        <div class="flex upcoming-tasks" style="width: 300px; height: fit-content; max-height: 1000px; overflow-y: scroll;"></div>
                    </div>
                </div>
            </div>
        `

        // Renders
        document.querySelector(".greeting-container").innerHTML = this.greeting.div
        document.querySelector(".projects-overview").innerHTML = this.projects.div
        document.querySelector(".upcoming-tasks").innerHTML = this.upcoming.div
        // document.querySelector(".progress-log").innerHTML = this.progressLog.div

        // Manipulations
        document.getElementById("profile-container").innerHTML = current_user.html.profile
        this.projects.list()
        this.upcoming.tasks()

        // Event Listener
        content.removeEventListener("click", this.handleDivClick, true)
        content.addEventListener("click", this.handleDivClick)
        document.getElementById("header").addEventListener("click", (e) => { this.handleDivClick(e) })

        document.addEventListener("scroll", this.handleScroll)
    }
}