module Lookbook
  module AttributeUtils
    class << self
      def dom_id(*args)
        ["lookbook", *args].join("-").parameterize.dasherize
      end

      def entity_id(*args)
        parts = args.map { |arg| arg.to_s.force_encoding("UTF-8").parameterize.underscore }
        parts.join("-").tr("/_", "-").delete_prefix("-").delete_suffix("-").gsub("--", "-")
      end
    end
  end
end
