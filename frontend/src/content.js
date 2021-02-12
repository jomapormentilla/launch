class Content {
    static div = document.getElementById("content")
    
    static render() {
        this.div.style.opacity = 1
    }

    constructor({name}) {
        this.name = name
    }

}