class Error {
    static render(data) {
        let div = document.createElement("div")
        div.classList.add("error")
        div.innerHTML = data

        document.querySelector(".error-container").append(div)
        div.addEventListener("click", this.handleErrorClick)
        
        setTimeout(()=>{ 
            div.style.opacity = 0 
            setTimeout(()=>{ div.remove() }, 1000)
        }, 7000)
    }

    static alert(data) {
        let div = document.createElement("div")
        div.classList.add("alert")
        div.innerHTML = data

        document.querySelector(".error-container").append(div)
        div.addEventListener("click", this.handleErrorClick)
        
        setTimeout(()=>{ 
            div.style.opacity = 0 
            setTimeout(()=>{ div.remove() }, 1000)
        }, 7000)
    }

    static removeAll() {
        if (document.querySelectorAll(".error")) {
            for (let err of document.querySelectorAll(".error")) {
                err.remove()
            }
        }
    }

    static handleErrorClick = e => {
        e.target.remove()
    }
}