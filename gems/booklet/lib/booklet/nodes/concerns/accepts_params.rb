module Booklet
  module AcceptsParams
    extend ActiveSupport::Concern

    included do
      prop :params, ParamSet, default: -> { ParamSet.new }, reader: :public
    end
  end
end
