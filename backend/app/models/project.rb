class Project < ApplicationRecord
    belongs_to :creator, class_name: "User"
    
    has_many :tasks
    has_many :users, through: :tasks
end
