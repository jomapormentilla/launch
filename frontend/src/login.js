class Login {
    static get forms() {
        let data = {
            login: `
                <h1 style="font-family: 'Amatic SC', cursive; font-size: 100px; color: #3b5ab1;">LAUNCH</h1>
                <form id="login-form">
                    <input type="email" placeholder="Email" value="jomapormentilla@gmail.com"><br>
                    <input type="password" placeholder="Password"><br>
                    <button type="submit">Login</button>
                </form>
                
                <hr>
                <p style="text-align: center;">Need an account? <span id="signup-btn">Sign Up</span></p>
                <div class="buffer" style="height: 300px;"></div>
            `,

            loginSubmit: (e) => {
                e.preventDefault()

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
            },

            signup: `
                <h1 style="font-family: 'Amatic SC', cursive; font-size: 100px;">LAUNCH</h1>
                <form id="login-form">
                    <input type="text" name="first_name" placeholder="First Name"><br>
                    <input type="text" name="last_name" placeholder="Last Name"><br>
                    <input type="email" placeholder="Email" value="jomapormentilla@gmail.com"><br>
                    <input type="password" placeholder="Password"><br>
                    <select name="department_id">
                        <option selected>-- Select a Department --</option>
                        ${ this.actions.renderDepartments() }
                    </select>
                    <button type="submit">Sign Up</button>
                </form>
                
                <hr>
                <p style="text-align: center;">Already a member? <span id="signup-btn">Login</span></p>
                <div class="buffer" style="height: 300px;"></div>
            `,

            signupClick: (e) => {
                if (e.target.innerText === "Sign Up") {
                    document.getElementById("login").innerHTML = this.forms.signup
                } else if (e.target.innerText === "Login") {
                    document.getElementById("login").innerHTML = this.forms.login
                }
                document.getElementById("login-form").addEventListener("submit", (e)=>{ this.forms.loginSubmit(e) })
                document.getElementById("signup-btn").addEventListener("click", (e)=>{ this.forms.signupClick(e) })
            }
        }
        return data
    }

    static get actions() {
        let data = {
            renderDepartments: () => {
                let html = ``
                for (let dept of Department.all) {
                    html += `<option value="${ dept.id }">${ dept.name }</option>`
                }
                return html
            },

            loadDashboard: () => {
                this.actions.hide()
                
                container.style.display = "flex"
                setTimeout(()=>{ container.style.opacity = 1 }, 250)
                
                Error.removeAll()
                Dashboard.render()
            },

            hide: () => {
                document.getElementById("login").style.opacity = 0
                setTimeout(()=>{ document.getElementById("login").remove() }, 250)
            },

            logout: () => {
                session.clear()
                location.reload()
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
        if (!!session.getItem("userId") && !!session.getItem("userToken")) {
            // Authentication
            UserApi.authenticateToken(session)

        } else {
            // Initial
            document.getElementById("login").innerHTML += this.forms.login

            // Event Listeners
            document.getElementById("login-form").addEventListener("submit", (e)=>{ this.forms.loginSubmit(e) })
            document.getElementById("signup-btn").addEventListener("click", (e)=>{ this.forms.signupClick(e) })
        }
    }
}