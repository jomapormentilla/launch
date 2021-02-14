class User < ApplicationRecord
    belongs_to :department
    
    has_many :tasks
    has_many :user_projects
    has_many :projects, through: :user_projects

    has_one :project, foreign_key: 'creator_id'
end
