class TaskApi {
    static url = `http://localhost:3000/tasks`
    
    static getTasks() {
        fetch(this.url)
          .then(res => res.json())    
          .then(data => {
              for (let task of data) {
                  let newTask = new Task(task)
              }
          })
    }
}