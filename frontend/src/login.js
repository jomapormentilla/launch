class Login {
    static login = document.getElementById("login")
    static nav = document.getElementById("nav-container")

    static render() {
        this.renderLoginForm()
        this.login.addEventListener("submit", this.handleLogin)
    }

    static handleSignupClick = e => {
        if (e.target.innerText === "Sign Up") {
            this.renderSignupForm()
        } else if (e.target.innerText === "Login") {
            this.renderLoginForm()
        }
    }

    static renderLoginForm() {
        this.login.innerHTML = `
            <h1 style="font-family: 'Amatic SC', cursive; font-size: 100px;">LAUNCH</h1>
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
        e.preventDefault()
        
        if (e.target.lastElementChild.innerText === "Login") {
            current_user = User.all.find(u => u.email === e.target.children[0].value)
            
            this.greeting()
            this.hide()
            
            container.style.display = "flex"
            setTimeout(()=>{ container.style.opacity = 1 }, 250)
            
            Dashboard.render()
        } else if (e.target.lastElementChild.innerText === "Sign Up") {
            console.log("Sign Up")
        }
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
}