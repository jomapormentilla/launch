class DepartmentSerializer
    def initialize(department_object)
        @department = department_object
    end

    def to_serialized_json
        @department.to_json(
            :include => [
                :users => {except: [:password, :department_id]}
            ]
        )
    end
end