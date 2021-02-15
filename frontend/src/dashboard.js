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
                alert("Profile - Inside Header Hash!")
            },

            messages: `
                <h1>Your Messages</h1>
            `,

            renderMessages: (e) => {
                alert("Messages - Inside Header Hash!")
            }
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
            
            add: () => {
                let div = document.createElement("div")
                div.innerHTML = data
                div.classList.add("progress-log-item")
                document.getElementById("prog-log").prepend(div)
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
        div.dataset.id = id
        div.classList.add("flex")
        div.style.minWidth = "100%"
        div.innerHTML += html

        content.append(div)
        div.addEventListener("click", this.handleDivClick)
    }

    static render() {
        content.innerHTML = ``
        Error.removeAll()
        
        this.renderDiv(this.progressLog.div, "progress-log")

        // Header Event Listeners
        document.querySelector(".bi-person-circle").addEventListener("click", (e)=>{ this.header.renderProfile() })
        document.querySelector(".bi-envelope").addEventListener("click", (e)=>{ this.header.renderMessages() })
    }
}