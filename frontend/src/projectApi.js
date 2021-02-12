class ProjectApi {
    static url = `http://localhost:3000/projects`
    
    static getProjects() {
        fetch(this.url)
          .then(res => res.json())
          .then(data => {
            for (let project of data) {
                let p = new Project(project)
            }
          })
    }

    static createProject() {
        let projectInfo = {

        }
    }
}