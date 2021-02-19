class TasksController < ApplicationController
    def index
        tasks = Task.all.includes(:user, :project, :comments)
        render json: TaskSerializer.new(tasks).to_serialized_json
    end

    def create
        task = Task.new(task_params)

        if task.save
            render json: TaskSerializer.new(task).to_serialized_json
        else
            render json: { error: 'Something went wrong! Unable to create Task' }
        end
    end

    def show
        task = Task.find_by_id(params[:id])

        if task
            render json: TaskSerializer.new(task).to_serialized_json
        else
            render json: { error: 'Unable to find Task' }
        end
    end

    def update
        task = Task.find_by_id(params[:id])

        if task.update(task_params)
            render json: TaskSerializer.new(task).to_serialized_json
        else
            render json: { error: 'Unable to update Task' }
        end
    end

    def destroy
        task = Task.find_by_id(params[:id])

        if task
            task.destroy
            render json: { message: 'Task successfully deleted.' }
        else
            render json: { error: 'Unable to delete Task.' }
        end
    end

    private

    def task_params
        params.require(:task).permit(:name, :description, :deadline, :user_id, :project_id, :status)
    end
end
