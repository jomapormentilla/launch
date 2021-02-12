class Login {
    static login = document.getElementById("login")

    static render() {
        this.login.innerHTML = `
            <h1>LAUNCH</h1>
            <form id="login-form">
                <input type="text" placeholder="Username"><br>
                <input type="password" placeholder="Password"><br>
                <button type="submit">Login</button>
            </form>
        `
        this.login.addEventListener("submit", this.handleLogin)
    }

    static handleLogin = e => {
        e.preventDefault()
        this.hide()
        container.style.display = "flex"
        setTimeout(()=>{ container.style.opacity = 1 }, 250)
    }

    static hide() {
        this.login.style.opacity = 0
        setTimeout(()=>{ this.login.remove() }, 250)
    }
}