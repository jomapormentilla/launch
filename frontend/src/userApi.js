class UserApi {
    static url = `http://localhost:3000/users`
    
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
}