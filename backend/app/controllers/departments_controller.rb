class DepartmentsController < ApplicationController
    def index
        departments = Department.all
        render json: DepartmentSerializer.new(departments).to_serialized_json
    end
end
