class TaskSerializer
    def initialize(task_object)
        @task = task_object
    end

    def to_serialized_json
        @task.to_json(
            :include => [
                :project => {only: [:name]},
                :user => {except: [:password]}
            ]
        )
    end
end