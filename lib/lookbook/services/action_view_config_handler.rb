module Lookbook
  class ActionViewConfigHandler < Service
    attr_reader :disable_annotations

    def initialize(disable_annotations: true)
      @disable_annotations = disable_annotations
    end

    def call
      handle_annotations
      yield
    ensure
      restore_annotations
    end

    private

    def handle_annotations
      return unless disable_annotations && ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames)

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
