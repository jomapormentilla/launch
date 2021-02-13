class Login {
    static login = document.getElementById("login")

    static render() {
        this.login.innerHTML = `
            <h1 style="font-family: 'Amatic SC', cursive; font-size: 100px;">LAUNCH</h1>
            <form id="login-form">
                <input type="email" placeholder="Email" value="jomapormentilla@gmail.com"><br>
                <input type="password" placeholder="Password"><br>
                <button type="submit">Login</button>
            </form>
            <div class="buffer" style="height: 300px;"></div>
        `
        this.login.addEventListener("submit", this.handleLogin)
    }

    static handleLogin = e => {
        e.preventDefault()
        current_user = User.all.find(u => u.email === e.target.children[0].value)
        this.hide()
        container.style.display = "flex"
        setTimeout(()=>{ container.style.opacity = 1 }, 250)
        Dashboard.render()
    }

    static hide() {
        this.login.style.opacity = 0
        setTimeout(()=>{ this.login.remove() }, 250)
    }
}