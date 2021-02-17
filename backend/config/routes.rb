Rails.application.routes.draw do
  post '/authenticate' => "users#authenticate"
  post '/authenticateToken' => "users#authenticateToken"

  resources :departments
  resources :tasks
  resources :projects
  resources :users
  resources :user_projects, only: [:create, :destroy]

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
