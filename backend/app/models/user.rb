class User < ApplicationRecord
    belongs_to :department
    
    has_many :tasks
    has_many :projects, through: :tasks

    has_one :project, foreign_key: 'creator_id'

    validates :first_name, presence: true
end
