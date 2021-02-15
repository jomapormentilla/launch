class DepartmentsController < ApplicationController
    def index
        departments = Department.all.includes(:users)
        render json: DepartmentSerializer.new(departments).to_serialized_json
    end
end
