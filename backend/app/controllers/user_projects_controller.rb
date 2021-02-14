class UserProjectsController < ApplicationController
    def create
        user_project = UserProject.find_by(user_id: params[:id], project_id: params[:project_id])

        if !user_project
            UserProject.create(user_id: params[:id], project_id: params[:project_id])
            render json: { message: 'User successfully added to Project' }
        else
            render json: { error: 'User is already assigned to this project.' }
        end
    end

    def destroy

    end
end