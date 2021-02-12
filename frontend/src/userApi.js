class UserApi {
    static url = `http://localhost:3000/users`
    
    static getUsers() {
        fetch(this.url)
          .then(res => res.json())
          .then(data => {
              for (let user of data) {
                  let u = new User(user)
              }
          })
    }
}