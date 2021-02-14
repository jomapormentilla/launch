class UserProjectsController < ApplicationController
    def create
        user_project = UserProject.find_by(user_id: params[:id], project_id: params[:project_id])

        if !user_project
            UserProject.create(user_id: params[:id], project_id: params[:project_id])
            render json: { message: 'User successfully added to the Project' }
        else
            render json: { error: 'User is already assigned to this project.' }
        end
    end

    def destroy
        user_project = UserProject.find_by(user_id: params[:user_project][:id], project_id: params[:user_project][:project_id])
        
        if user_project
            user_project.destroy
            render json: { message: 'Successfully removed user from Project' }
        else
            render json: { error: 'Something went wrong: Unable to remove association.' }
        end
    end
end