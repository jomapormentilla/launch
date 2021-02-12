class User < ApplicationRecord
    belongs_to :department
    
    has_many :tasks
    has_many :projects, through: :tasks
end
