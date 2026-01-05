Lookbook::Engine.routes.draw do
  root to: "start#index", as: :lookbook

  get "/:collection_id", to: "collections#show", as: :lookbook_collection

  # get "/#{Lookbook.config.page_route}", to: "pages#index", as: :lookbook_pages
  # get "/#{Lookbook.config.page_route}/*path", to: "pages#show", as: :lookbook_page

  # get "/specs", to: "specs#index", as: :lookbook_specs
  # get "/specs/:spec/:scenario", to: "scenarios#show", constraints:, as: :lookbook_scenario
  # get "/specs/:spec", to: "specs#show", constraints:, as: :lookbook_spec

  # get "/previews/:spec/:scenario", to: "previews#show", constraints:, as: :lookbook_scenario_preview

  # if Lookbook::Engine.preview_embeds_allowed?
  #   # get "/embeds", to: "embeds#lookup", as: :lookbook_embed_lookup
  #   get "/embeds/:spec/:scenario", to: "embeds#scenario", constraints:, as: :lookbook_scenario_embed
  #   get "/embeds/:spec", to: "embeds#spec", constraints:, as: :lookbook_spec_embed
  # end

  # get "/events", to: "sse#index", as: :sse

  get "/*path", to: "application#not_found", via: :all
end
