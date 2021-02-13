class ProjectApi {
    static url = `http://localhost:3000/projects`
    
    static getProjects() {
        fetch(this.url)
          .then(res => res.json())
          .then(data => {
            for (let project of data) {
                let _project = Project.all.find(p => p.id === project.id)
                if(!_project){ new Project(project) }
            }
          })
    }

    static createProject(data) {
        let projectInfo = {
            name: data[0].value,
            description: data[1].value,
            creator_id: current_user.id
        }

        let configObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(projectInfo)
        }

        fetch(this.url, configObj)
            .then(res => res.json())
            .then(data => {
                let p = new Project(data)
                Project.render()
            })
            .catch(err => console.log(err))
    }
}