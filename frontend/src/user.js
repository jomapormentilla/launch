class User {
    static all = []

    constructor({first_name, last_name, email}) {
        this.firstName = first_name
        this.lastName = last_name
        this.email = email
        
        User.all.push(this)
    }
}