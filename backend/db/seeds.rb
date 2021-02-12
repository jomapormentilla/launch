# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def start
    createDepartments
    createUsers
end

def createDepartments
    departments = ["Design", "Marketing", "Accounting", "Human Resources", "Legal"]
    departments.each do |d|
        Department.create(name: d)
    end
end

def createUsers
    
end

start