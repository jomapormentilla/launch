class TaskApi {
    static url = `http://localhost:3000/tasks`
    
    static getTasks() {
      fetch(this.url)
        .then(res => res.json())    
        .then(data => {
            for (let task of data) {
              let _task = Task.all.find(t => t.id === task.id)
              if (!_task) { new Task(task) }
            }
        })
    }

    static createTask(data) {
      let configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch(this.url, configObj)
        .then(res => res.json())
        .then(data => {
          if (!!data.error) {
            Error.render(data.error)
          } else {
            let task = new Task(data)
            let project = task.project
            project.taskIds.push({id: task.id})
            Error.alert("Success")
          }
        })
    }
}