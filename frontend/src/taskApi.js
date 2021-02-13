class TaskApi {
    static url = `http://localhost:3000/tasks`
    
    static getTasks() {
        fetch(this.url)
          .then(res => res.json())    
          .then(data => {
              for (let task of data) {
                let _task = Task.all.find(t => t.id === task.id)
                if (!_task) {
                    new Task(task)
                }
              }
          })
    }
}