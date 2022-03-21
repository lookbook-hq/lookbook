Lookbook::Engine.routes.draw do
  if Lookbook.config.auto_refresh
    mount Lookbook::Engine.websocket => Lookbook.config.cable.mount_path
  end

  root to: "application#index", as: :home

  if Lookbook::Features.enabled?(:pages)
    get "/#{Lookbook.config.page_route}", to: "pages#index", as: :page_index
    get "/#{Lookbook.config.page_route}/*path", to: "pages#show", as: :page
  end

  get "/preview/*path", to: "previews#preview", as: :preview
  get "/*path", to: "previews#show", as: :show
end
