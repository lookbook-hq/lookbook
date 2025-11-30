module Lookbook
  module WithSpecs
    extend ActiveSupport::Concern

    included do
      layout "lookbook/specs"

      before_action :assign_specs

      protected

      def assign_specs
        @specs = Engine.previews
      end

      def assign_spec
        @spec = @specs.find_by_path(params[:spec].tr(".", "/"))
      end

      def record_last_spec_visited
        cookies[:lookbook_last_spec_visited] = {
          value: request.path,
          expires: 1.hour.from_now
        }
      end
    end
  end
end
