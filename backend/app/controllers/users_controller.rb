class UsersController < ApplicationController
    def index
        users = User.all.includes(:projects, :tasks, :department)
        render json: UserSerializer.new(users).to_serialized_json
    end
    
    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :department_id, :password)
    end
end
