# class ResourceTypeConstraint
#   def initialize(type)
#     @type = type
#     @param_key = @type.name.demodulize.downcase.to_sym
#   end

#   def matches?(request)
#     resources(request.params[:collection]).include?(request.params[@param_key].to_param)
#   end

#   protected def resources(collection_id)
#     # TODO: optimise/cache resources lookup
#     collection = Lookbook::Collection.find(collection_id)
#     collection ? collection.resources.map do |resource|
#       resource.to_param if resource.is_a?(@type)
#     end.compact : []
#   end
# end

Rails.application.routes.draw do
  get(
    "lookbook/previews/:spec/:scenario",
    to: "lookbook_preview#show",
    as: :lookbook_preview,
    internal: true
  )
end

Lookbook::Engine.routes.draw do
  root to: "start#index", as: :lookbook

  scope as: :lookbook do
    get "/collections/:collection", to: "collections#show", as: :collection

    get "/specs/:spec", to: "specs#show", as: :spec
    get "/specs/:spec/scenarios/:scenario", to: "scenarios#show", as: :scenario

    get "/pages/:page", to: "pages#show", as: :page

    get "/events", to: "sse#index", as: :events
  end

  # if Lookbook::Engine.preview_embeds_allowed?
  #   # get "/embeds", to: "embeds#lookup", as: :lookbook_embed_lookup
  #   get "/embeds/:spec/:scenario", to: "embeds#scenario", constraints:, as: :lookbook_scenario_embed
  #   get "/embeds/:spec", to: "embeds#spec", constraints:, as: :lookbook_spec_embed
  # end
end
