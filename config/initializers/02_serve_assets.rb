Rails.application.config.app_middleware.use(
  Rack::Static,
  urls: ["/lookbook-assets"],
  root: Lookbook::Engine.root.join("public").to_s
)
