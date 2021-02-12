class Dashboard {
    static render() {
        document.getElementById("header").addEventListener("click", this.handleHeaderClick)
        content.innerHTML = `
            <h1>Welcome Back, ${ current_user.firstName }!</h1>
        `
    }

    static handleHeaderClick = e => {
        if (e.target.classList.contains("bi-person-circle")) {
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
        } else if (e.target.classList.contains("bi-envelope")) {
            alert("Messages!")
        }
    }
}