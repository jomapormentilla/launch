class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.datetime :deadline
      t.belongs_to :user
      t.belongs_to :project
      
      t.timestamps
    end
  end
end
