module Lookbook
  class ScenariosController < Lookbook::ApplicationController
    include WithScenario

    def show
      render inertia: {
        scenario: @scenario,
        resource_id: @scenario.id,
        collection_id: collection.id,
        preview: {
          src: @scenario.preview_path(**param_values),
          srcdoc: @scenario.call(param_values)
        },
        ancestors:,
        spec:,
        panels:
      }
    end

    private def param_controls
      @scenario.params
        .with_values(param_values)
        .map { InspectorParam.new(_1).to_inertia }
    end

    # TODO: Build panels list dynamically from config/plugins
    private def panels
      {
        drawer: [
          {
            id: "source-tab",
            label: "Source",
            component: :snippet,
            props: {
              content: helpers.snippet(@scenario.source, lang: @scenario.source.lang),
              lang: @scenario.source.lang
            }
          },
          {
            id: "html-tab",
            label: "HTML",
            component: :snippet,
            props: {
              content: helpers.snippet(@scenario.call(param_values), lang: :html),
              lang: :html,
              output: true
            }
          }
        ],
        sidebar: [
          {
            id: "params-tab",
            label: "Params",
            component: :params,
            props: {
              params: param_controls
            }
          }
        ]
      }
    end

    private def ancestors
      @scenario.ancestors.map { _1.to_inertia(include_children: false) }.reverse
    end

    private def spec
      spec_id = @scenario.spec.id
      collection.specs.find { _1.id == spec_id }
    end

    private def collection = @scenario.collection

    private def param_values
      request.query_parameters[:params] || {}
    end
  end
end
