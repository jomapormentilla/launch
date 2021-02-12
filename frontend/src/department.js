class Department {
    static all = []

    constructor({id, name}) {
        this.id = id
        this.name = name
        Department.all.push(this)
    }
}