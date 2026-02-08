module Lookbook
  module Unannotatable
    extend ActiveSupport::Concern

    included do
      around_action :without_annotations

      private def without_annotations
        disable_annotations
        yield
        restore_annotations
      end

      private def disable_annotations
        return unless ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)

        @original_annotations_value = ActionView::Base.annotate_rendered_view_with_filenames
        ActionView::Base.annotate_rendered_view_with_filenames = false
      end

      private def restore_annotations
        return if @original_annotations_value.nil?

        ActionView::Base.annotate_rendered_view_with_filenames = @original_annotations_value
        @original_annotations_value = nil
      end
    end
  end
end
