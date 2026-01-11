module Lookbook
  class Resource < Lookbook::Object
    prop :entity, Booklet::Node, :positional, reader: :public

    # attr_reader :entity

    # def initialize(entity)
    #   @entity = entity
    # end

    delegate_missing_to :@entity

    def to_param
      # pd entity
      @entity.ref_path(separator: ".")
    end
  end
end
