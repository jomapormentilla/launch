class Modal {
    static render(data) {
        document.body.append(this.renderBackdrop(data))
    }
    
    static renderBackdrop(data) {
        this.div = document.createElement("div")
        this.div.classList.add("backdrop")
        this.div.style.zIndex = "10"
        setTimeout(() => { this.div.style.opacity = "0.8" }, 250)
        this.div.addEventListener("click", this.hideModal)
        this.div.append(this.renderBody(data))

        return this.div
    }

    static hideModal = e => {
        if (e.target.classList.contains("backdrop")) {
            e.target.remove()
        }
    }

    static renderBody(data) {
        let body = document.createElement("div")
        body.style.zIndex = "11"
        body.removeEventListener("click", ()=>{})
        body.innerHTML = data

        return body
    }
}