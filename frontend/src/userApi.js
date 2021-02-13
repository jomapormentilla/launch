class UserApi {
    static url = baseUrl + `/users`
    
    static getUsers() {
        fetch(this.url)
          .then(res => res.json())
          .then(data => {
              for (let user of data) {
                  let _user = User.all.find(u => u.id === user.id)
                  if (!_user) { new User(user) }
              }
              return data
          })
          .then(data => Login.render())
    }

    static createUser(data) {
        let userInfo = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            department_id: data.department_id
        }

        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
        }

        fetch(this.url, configObj)
            .then(res => res.json())
            .then(this.handleNewUserSignup)
            .catch(error => console.log(error))
    }
   
    static handleNewUserSignup = data => {
        if (!!data.error) {
            console.log(data.error)
            Error.render(data.error)
        } else {
            current_user = User.all.find(u => u.email === data.email)
            Login.loadDashboard()
        }
    }

    static authenticate(data) {
        let url = baseUrl + `/authenticate`
        let info = data
        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(info)
        }

        fetch(url, configObj)
            .then(res => res.json())
            .then(this.handleAuthenticate)

    }

    static handleAuthenticate = data => {
        if (!!data.error) {
            Error.render(data.error)
        } else {
            current_user = User.all.find(u => u.id === data.id)
            session.setItem('userId', current_user.id)
            Login.loadDashboard()
        }
    }
}