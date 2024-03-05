module Lookbook
  module Updatable
    extend ActiveSupport::Concern

    def on_update(&block)
      update_callbacks << block if block
    end

    private

    def run_update_callbacks
      update_callbacks.each { _1.call }
    end

    def update_callbacks
      @update_callbacks ||= []
    end
  end
end
