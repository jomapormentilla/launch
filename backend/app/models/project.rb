class Project < ApplicationRecord
    belongs_to :creator, class_name: "User"
    
    has_many :tasks
    has_many :user_projects
    has_many :users, through: :user_projects
end
