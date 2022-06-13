Lookbook::Engine.routes.draw do
  if Lookbook.config.auto_refresh
    mount Lookbook::Engine.websocket => Lookbook.config.cable_mount_path
  end

  root to: "application#index", as: :lookbook_home

  if Lookbook::Features.enabled?(:pages)
    get "/#{Lookbook.config.page_route}", to: "pages#index", as: :lookbook_page_index
    get "/#{Lookbook.config.page_route}/*path", to: "pages#show", as: :lookbook_page
  end

  get "/preview/*path", to: "previews#preview", as: :lookbook_preview
  get "/*path", to: "previews#show", as: :lookbook_inspect
end
