module Lookbook
  module Concerns
    module Annotatable
      extend ActiveSupport::Concern

      def disable_view_annotations
        return unless ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)

        @original_annotations_value = ActionView::Base.annotate_rendered_view_with_filenames
        ActionView::Base.annotate_rendered_view_with_filenames = false
      end

      def restore_view_annotations
        return if @original_annotations_value.nil?

        ActionView::Base.annotate_rendered_view_with_filenames = @original_annotations_value
        @original_annotations_value = nil
      end
    end
  end
end
