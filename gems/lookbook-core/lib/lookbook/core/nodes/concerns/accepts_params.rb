module Lookbook::Core
  module AcceptsParams
    extend ActiveSupport::Concern

    included do
      prop :params, ParamSet, default: -> { ParamSet.new }, reader: :public
    end
  end
end
