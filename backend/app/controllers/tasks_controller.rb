class TasksController < ApplicationController
    def index
        tasks = Task.all.includes(:user, :project)
        render json: TaskSerializer.new(tasks).to_serialized_json
    end
end
