Lookbook::Engine.routes.draw do
  if Lookbook.config.auto_refresh
    mount Lookbook::Engine.websocket => Lookbook.config.cable_mount_path
  end

  root to: "application#index", as: :lookbook_home

  get "/#{Lookbook.config.page_route}", to: "pages#index", as: :page_index
  get "/#{Lookbook.config.page_route}/*path", to: "pages#show", as: :page

  get "/preview/*path", to: "previews#preview", as: :preview
  get "/inspect/*path", to: "previews#show", as: :inspect

  get "/*path", to: "previews#show_legacy", as: :inspect_legacy
end
