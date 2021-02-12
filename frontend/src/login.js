class Login {
    static render() {
        document.getElementById("login").innerHTML = `
            <form id="login-form">
                <input type="text" placeholder="Username"><br>
                <input type="password" placeholder="Password"><br>
                <button type="submit">Login</button>
            </form>
        `
    }
}