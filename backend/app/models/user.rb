class User < ApplicationRecord
    belongs_to :department
    
    has_many :tasks
    has_many :user_projects
    has_many :projects, through: :user_projects

    has_one :project, foreign_key: 'creator_id'

    has_many :messages_sent, class_name: "Message", foreign_key: "sender_id"
    has_many :messages_received, class_name: "Message", foreign_key: "receiver_id"

    has_many :comments
end
