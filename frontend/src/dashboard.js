class Dashboard {
    static render() {
        document.getElementById("header").querySelector(".bi-person-circle").addEventListener("click", this.handleProfileClick)
        content.innerHTML = `
            <h1>Welcome Back!</h1>    
        `
    }

    static handleProfileClick = e => {
        let data = {
            innerHTML: `
                <h1>Profile Settings</h1>   
            `,
            justifyContent: `flex-end`
        }
        Modal.render(data)
    }
}