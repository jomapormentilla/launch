class TasksController < ApplicationController
    def index
        tasks = Task.all
        render json: TaskSerializer.new(tasks).to_serialized_json
    end
end
