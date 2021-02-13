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
          })
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
            .then(this.handleResponse)
            .catch(error => console.log(error))

    }
   
    static handleResponse = data => {
        debugger
        if (!!data.error) {
            console.log(data.error)
        } else {
            console.log("YAY")
        }
    }
}