module Lookbook
  module Unannotatable
    extend ActiveSupport::Concern

    included do
      around_action :lookbook_without_annotations
    end

    private def lookbook_without_annotations
      lookbook_disable_annotations
      yield
      lookbook_restore_annotations
    end

    private def lookbook_disable_annotations
      return unless ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)

      @lookbook_original_annotations_value = ActionView::Base.annotate_rendered_view_with_filenames
      ActionView::Base.annotate_rendered_view_with_filenames = false
    end

    private def lookbook_restore_annotations
      return if @lookbook_original_annotations_value.nil?

      ActionView::Base.annotate_rendered_view_with_filenames = @lookbook_original_annotations_value
      @lookbook_original_annotations_value = nil
    end
  end
end
