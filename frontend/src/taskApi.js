class TaskApi {
    static url = `${ baseUrl }/tasks`
    
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
            document.getElementById("new-task-form").reset()
            document.querySelector(".task-list").innerHTML = project.buildTask.list()
            document.querySelector(".task-count").innerHTML = `(${ project.tasks.length })`
          }
        })
    }

    static updateTask(data) {
      let configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch(this.url + `/${ data.id }`, configObj)
        .then(res => res.json())
        .then(data => {
          if (!!data.error) {
            Error.render(data.error)
          } else {
            Error.alert(`Moved to '${ data.status }'`)
          }
        })
    }
}