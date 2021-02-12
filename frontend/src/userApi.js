class UserApi {
    static url = `http://localhost:3000/users`
    
    static getUsers() {
        fetch(this.url)
          .then(res => res.json())
          .then(data => {
              console.log(data)
          })
    }
}