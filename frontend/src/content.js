class Content {
    static div = document.getElementById("content")
    
    static render(data) {
        this.div.style.opacity = 0
        setTimeout(()=>{ 
            switch (data) {
                case 'dashboard':
                    this.dashboard()
                    break
                case 'users':
                    this.users()
                    break
                case 'projects':
                    this.projects()
                    break
            }
        }, 500)
    }

    static dashboard() {
            this.div.style.opacity = 1 
            this.div.innerHTML = 'DASHBOARD!'
    }
    
    static users() {
            this.div.style.opacity = 1 
            this.div.innerHTML = 'USERS!'
    }
    
    static projects() {
            this.div.style.opacity = 1 
            this.div.innerHTML = 'PROJECTS!'
    }
}