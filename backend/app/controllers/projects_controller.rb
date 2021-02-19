class ProjectsController < ApplicationController
    def index
        projects = Project.all.includes(:users, :tasks, :creator, :comments)
        render json: ProjectSerializer.new(projects).to_serialized_json
    end

    def create
        project = Project.new(project_params)

        if project.save
            render json: ProjectSerializer.new(project).to_serialized_json
        else
            render json: { err: 'Something went wrong' }
        end
    end

    def show
        project = Project.find_by_id(params[:id])

        if project
            render json: ProjectSerializer(project).to_serialized_json
        else
            render json: { error: 'Unable to find Project' }
        end
    end

    def update
        project = Project.find_by_id(params[:id])

        if project.update(project_params)
            render json: ProjectSerializer.new(project).to_serialized_json
        else
            render json: { error: 'Unable to update Project' }
        end
    end

    def destroy
        project = Project.find_by_id(params[:id])

        if project
            project.destroy
            render json: { message: 'Project successfully deleted.' }
        else
            render json: { error: 'Unable to delete Project' }
        end
    end

    private

    def project_params
        params.require(:project).permit(:name, :description, :creator_id)
    end
end
