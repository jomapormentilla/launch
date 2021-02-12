class ProjectSerializer
    def initialize(project_object)
        @project = project_object
    end

    def to_serialized_json
        @project.to_json(
            :include => [
                :tasks => {only: [:name, :description, :deadline]},
                :users => {only: [:id]},
                :creator => {only: [:id]}
            ]
        )
    end
end