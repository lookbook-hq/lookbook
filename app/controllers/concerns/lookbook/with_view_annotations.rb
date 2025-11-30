module Lookbook
  module WithViewAnnotations
    extend ActiveSupport::Concern

    included do
      before_action :disable_annotations
      after_action :restore_annotations

      protected

      def disable_annotations
        return unless ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)

        @original_annotations_value = ActionView::Base.annotate_rendered_view_with_filenames
        ActionView::Base.annotate_rendered_view_with_filenames = false
      end

      def restore_annotations
        return if @original_annotations_value.nil?

        ActionView::Base.annotate_rendered_view_with_filenames = @original_annotations_value
        @original_annotations_value = nil
      end
    end
  end
end
