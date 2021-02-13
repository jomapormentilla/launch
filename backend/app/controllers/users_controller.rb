class UsersController < ApplicationController
    def index
        users = User.all.includes(:projects, :tasks, :department)
        render json: UserSerializer.new(users).to_serialized_json
    end

    def create
        user = User.new(user_params)
        if user.save
            render json: UserSerializer.new(user).to_serialized_json
        else
            render json: { error: 'Something went wrong: User could not be saved.' }
        end
    end
    
    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end

    def update
        user = User.find_by(id: params[:id])

        if user.update(user_params)
            render json: UserSerializer.new(user).to_serialized_json
        else
            render json: { error: 'Something went wrong: User could not be updated.' }
        end
    end

    def destroy
        user = User.find_by_id(params[:id])

        if user
            user.destroy
            render json: { message: 'User successfully deleted from database.' }
        else
            render json: { error: 'Unable to delete User' }
        end
    end

    private

    def user_params
        params.require(:user).permit(:first_name, :last_name, :email, :department_id, :password)
    end
end
