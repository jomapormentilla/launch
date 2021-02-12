class ProjectsController < ApplicationController
    def index
        projects = Project.all
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

    private

    def project_params
        params.require(:project).permit(:name)
    end
end
