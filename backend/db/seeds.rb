# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def start
    # createDepartments
    createAdmin
    createUsers
    createProjects
    createTasks
end

def createDepartments
    departments = ["Software Engineering", "Design", "Marketing", "Accounting", "Human Resources", "Legal"]
    departments.each do |d|
        Department.create(name: d)
    end
end

def createAdmin
    data = {
        first_name: "Joma",
        last_name: "Pormentilla",
        email: "jomapormentilla@gmail.com",
        password: "password",
        department_id: Department.find_by(name:"Software Engineering").id
    }

    User.create(data)
end

def createUsers
    20.times do
        name = "#{ Faker::Name.first_name } #{ Faker::Name.last_name }"
        email = "#{ name.gsub(" ","").downcase }@gmail.com"
        
        data = {
            first_name: name.split(" ")[0],
            last_name: name.split(" ")[1],
            email: email,
            password: "password",
            department_id: Department.all.sample.id
        }

        User.create(data)
    end
end

def createProjects
    20.times do
        data = {
            name: Faker::App.name,
            description: Faker::Movies::VForVendetta.speech,
            creator_id: User.all.sample.id
        }

        Project.create(data)
    end
end

def createTasks
    50.times do
        data = {
            name: Faker::TvShows::SiliconValley.app,
            description: Faker::TvShows::SiliconValley.quote,
            deadline: Faker::Date.between(from: '2021-01-01', to: '2021-12-31'),
            user_id: User.all.sample.id,
            project_id: Project.all.sample.id,
            status: 'backlog'
        }

        Task.create(data)
    end
end

start