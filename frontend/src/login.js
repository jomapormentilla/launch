class Login {
    static login = document.getElementById("login")
    static nav = document.getElementById("nav-container")

    static handleSignupClick = e => {
        if (e.target.innerText === "Sign Up") {
            this.renderSignupForm()
        } else if (e.target.innerText === "Login") {
            this.renderLoginForm()
        }
    }

    static renderLoginForm() {
        this.login.innerHTML = `
            <h1 style="font-family: 'Amatic SC', cursive; font-size: 100px; color: #3b5ab1;">LAUNCH</h1>
            <form id="login-form">
                <input type="email" placeholder="Email" value="jomapormentilla@gmail.com"><br>
                <input type="password" placeholder="Password"><br>
                <button type="submit">Login</button>
            </form>
            
            <hr>
            <p style="text-align: center;">Need an account? <span id="signup-btn">Sign Up</span></p>
            <div class="buffer" style="height: 300px;"></div>
        `
        document.getElementById("signup-btn").addEventListener("click", this.handleSignupClick)
    }

    static renderSignupForm() {
        this.login.innerHTML = `
            <h1 style="font-family: 'Amatic SC', cursive; font-size: 100px;">LAUNCH</h1>
            <form id="login-form">
                <input type="text" name="first_name" placeholder="First Name"><br>
                <input type="text" name="last_name" placeholder="Last Name"><br>
                <input type="email" placeholder="Email" value="jomapormentilla@gmail.com"><br>
                <input type="password" placeholder="Password"><br>
                <select name="department_id">
                    <option selected>-- Select a Department --</option>
                    ${ this.renderDepartments() }
                </select>
                <button type="submit">Sign Up</button>
            </form>
            
            <hr>
            <p style="text-align: center;">Already a member? <span id="signup-btn">Login</span></p>
            <div class="buffer" style="height: 300px;"></div>
        `
        document.getElementById("signup-btn").addEventListener("click", this.handleSignupClick)
    }

    static handleLogin = e => {
        e.preventDefault(e)
        
        if (e.target.lastElementChild.innerText === "Login") {
            let loginInfo = {
                email: e.target.children[0].value,
                password: e.target.children[2].value
            }

            UserApi.authenticate(loginInfo)
        } else if (e.target.lastElementChild.innerText === "Sign Up") {
            let data = {
                first_name: e.target.children[0].value,
                last_name: e.target.children[2].value,
                email: e.target.children[4].value,
                password: e.target.children[6].value,
                department_id: parseInt(e.target.children[8].value, 10)
            }

            UserApi.createUser(data)
        }
    }

    static loadDashboard() {
        this.greeting()
        this.hide()
        
        container.style.display = "flex"
        setTimeout(()=>{ container.style.opacity = 1 }, 250)
        
        Error.removeAll()
        Dashboard.render()
    }

    static greeting() {
        let div = document.createElement("div")
        div.innerHTML = `Hello, ${ current_user.firstName }!`
        this.nav.append(div)
    }

    static hide() {
        this.login.style.opacity = 0
        setTimeout(()=>{ this.login.remove() }, 250)
    }

    static renderDepartments() {
        let html = ``
        for (let dept of Department.all) {
            html += `<option value="${ dept.id }">${ dept.name }</option>`
        }
        return html
    }

    static logout() {
        session.clear()
        location.reload()
    }

    static render() {
        if (!!session.getItem("userId") && !!session.getItem("userToken")) {
            UserApi.authenticateToken(session)
        } else {
            this.renderLoginForm()
            this.login.addEventListener("submit", this.handleLogin)
        }
    }
}