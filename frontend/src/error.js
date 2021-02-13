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
}