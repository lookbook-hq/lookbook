module Lookbook
  module UI
    class App < BaseComponent
      with_slot :header
      with_slot :sidebar
      with_slot :main
    end
  end
end
