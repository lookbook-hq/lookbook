module Lookbook
  class ActionViewAnnotationsHandler < Service
    attr_reader :disable_annotations

    def initialize(disable_annotations: true)
      @disable_annotations = disable_annotations
    end

    def call
      if ActionView::Base.respond_to?(:annotate_rendered_view_with_filenames) && disable_annotations
        original_value = ActionView::Base.annotate_rendered_view_with_filenames
        ActionView::Base.annotate_rendered_view_with_filenames = false
        res = yield
        ActionView::Base.annotate_rendered_view_with_filenames = original_value
        res
      else
        yield
      end
    end
  end
end
