class CommentsController < ApplicationController
    def index
        comments = Comment.all.includes(:user, commentable: [:task, :project])
        render json: comments
    end

    def create
        comment = Comment.new(comment_params)

        if comment.save
            render json: comment
        else
            render json: { error: "Something went wrong: Unable to save comment." }
        end
    end

    private

    def comment_params
        params.require(:comment).permit(:content, :commentable_id, :commentable_type, :user_id)
    end
end
