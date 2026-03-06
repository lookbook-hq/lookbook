# frozen_string_literal: true

module Booklet
  module Helpers
    def hexdigest(str)
      Digest::MD5.hexdigest(str.to_s)[0..6] if str.present?
    end

    def boolean?(value)
      value.in?([true, false])
    end

    extend self
  end
end
