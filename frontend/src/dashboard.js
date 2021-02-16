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
                alert("Messages - Inside Header Hash!")
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

    get html() {
        let data = {

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
                    <h2>Overview</h2>
                </div>
                
                ${ this.progressLog.div }
            `,

            list: () => {
                let projects = current_user.projects.sort()
                for (let project of current_user.projects) {
                    document.getElementById("project-div").innerHTML += `
                        <div id="project-${ project.id }">
                            <i class="bi bi-caret-down"></i> &nbsp; ${ project.name } <span style="float: right;">${ project.taskPercentage }</span>
                            <div class="more-info">${ this.projects.moreInfo(project) }</div>
                        </div>
                    `
                }
            },

            moreInfo: (project) => {
                let remainingTasks = project.tasks.filter(t => t.status !== "complete")
                let inProgressTasks = project.tasks.filter(t => t.status === "inprogress")
                
                let html = `
                    <table class="project-more-info">
                        <tr><td>Creator</td>
                            <td>${ project.creator.name }</td></tr>
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

    // Click Handling
    static handleDivClick = e => {
        // debugger

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
        }
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
        // Initial
        content.innerHTML = ``
        Error.removeAll()
        
        // Main Renders
        this.renderDiv(this.projects.div)
        this.projects.list()
        
        // Additional Renders
        document.getElementById("profile-container").innerHTML = current_user.html.profile

        // Event Listeners
        document.querySelector(".bi-person-circle").addEventListener("click", (e)=>{ this.header.renderProfile(e) })
        document.querySelector(".bi-envelope").addEventListener("click", (e)=>{ this.header.renderMessages(e) })
        document.querySelector(".bi-bell").addEventListener("click", (e)=>{ this.header.renderNotifications(e) })
    }
}