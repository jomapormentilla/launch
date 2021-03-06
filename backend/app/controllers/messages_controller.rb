class MessagesController < ApplicationController
    def index
        messages = Message.all.includes(:sender, :receiver)
        render json: messages
    end

    def create
        @message = Message.new(message_params)

        if @message.save
            # render json: @message
            ActionCable.server.broadcast("messages", { type: "create", data: @message })
        else
            render json: { error: 'Something went wrong! Unable to save message.' }
        end
    end

    def update
        message = Message.find_by_id(params[:id])
        messages = Message.all.where(receiver_id: message.receiver.id, sender_id: message.sender.id, seen: false)
        
        if message.update({seen: true})
            messages.each{|m| m.update(seen: true)}
            render json: message
        else
            render json: { error: 'Something went wrong! Unable to update message.' }
        end
    end

    private

    def message_params
        params.require(:message).permit(:content, :sender_id, :receiver_id, :seen)
    end
end
