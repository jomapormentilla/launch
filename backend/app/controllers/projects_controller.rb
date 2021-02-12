class ProjectsController < ApplicationController
    def index
        projects = Project.all
        render json: ProjectSerializer.new(projects).to_serialized_json
    end
end
