class MessagesController < ApplicationController
    def index
        messages = Message.all
        render json: messages
    end

    def create
        message = Message.new(message_params)

        if message.save
            render json: message
        else
            render json: { error: 'Something went wrong! Unable to save message.' }
        end
    end

    def update
        message = Message.find_by_id(params[:id])

        if message.update(message_params)
            render json: message
        else
            render json: { error: 'Something went wrong! Unable to update message.' }
        end
    end

    private

    def message_params
        params.require(:message).permit(:content, :sender_id, :receiver_id)
    end
end
