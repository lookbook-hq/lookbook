module Lookbook
  module ApplicationHelper
    def Partial(path, id = nil, **kwargs, &block)
      kwargs[:id] = id unless id.nil?
      render "lookbook/partials/#{path.to_s.underscore}", **kwargs, &block
    end
  end
end
