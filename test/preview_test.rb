require "test_helper"

module Lookbook
  class PreviewTest < ActiveSupport::TestCase
    setup do
      @previews = Lookbook::Preview.all
    end

    context "list of previews" do
      should "include previews from all preview directories" do
        assert @previews.size == 2
      end
    end
  end
end
