class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :content
      t.belongs_to :sender
      t.belongs_to :receiver
      t.timestamps
    end
  end
end
