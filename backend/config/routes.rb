Rails.application.routes.draw do
  post '/authenticate' => "users#authenticate"

  resources :departments
  resources :tasks
  resources :projects
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
