class MessageChannel < ApplicationCable::MessageChannel
    def subscribed
        stream_from("messages")
    end

    def unsubscribed

    end
end