module Lookbook
  module UI
    class Table < BaseComponent
      with_slot :header do |**kwargs|
        TableRow.new(**kwargs, header: true)
      end

      with_slot :row do |**kwargs|
        TableRow.new(**kwargs)
      end

      # def initialize(**kwargs)
      # end
    end
  end
end
