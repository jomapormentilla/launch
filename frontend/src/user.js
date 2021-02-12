class User {
    static all = []

    constructor({first_name, last_name, email}) {
        this.firstName = first_name
        this.lastName = last_name
        this.email = email
        
        User.all.push(this)
    }

    static render() {
        content.innerHTML = this.list()
    }

    static list() {
        let list = User.all.map((u) => {
            return `<li>${ u.firstName } ${ u.lastName }</li>`
        })
        return list
    }
}