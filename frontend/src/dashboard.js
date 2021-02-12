class Dashboard {
    static render() {
        document.getElementById("header").querySelector(".bi-person-circle").addEventListener("click", this.handleProfileClick)
        content.innerHTML = `
            <h1>Welcome Back!</h1>    
        `
    }

    static handleProfileClick = e => {
        let data = `
            <h1>Your Profile</h1>
        `
        Modal.render(data)
    }
}