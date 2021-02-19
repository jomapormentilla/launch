class Task < ApplicationRecord
    belongs_to :user
    belongs_to :project

    has_many :comments, as: :commentable

    validates :name, presence: true
    validates :description, presence: true
end
