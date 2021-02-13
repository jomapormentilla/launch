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
                    <li></li>
                </ul>
            `,
            justifyContent: `flex-end`
        }
        Modal.render(data)
    }

    static render_projects() {
        let html = ``
        for (let p of current_user.projects) {
            html += `<div class="card">${ p.name }</div>`
        }
        return html
    }

    static render() {
        document.getElementById("header").addEventListener("click", this.handleHeaderClick)
        content.innerHTML = `
            <div class="flex" style="flex-direction: column;">
                <h1>Welcome Back, ${ current_user.firstName }!</h1>
                <h3>Projects You Created:</h3>
                <div class="flex" style="flex-direction: row;">
                    ${ this.render_projects() }
                </div>
                
                <h3>Projects You Created:</h3>
                <div class="flex" style="flex-direction: row;">
                    ${ this.render_projects() }
                </div>
            </div>
        `
    }
}