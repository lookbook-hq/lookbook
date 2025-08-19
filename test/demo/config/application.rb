require "combustion"
require "sprockets"

Combustion.path = "test/demo"
Combustion.initialize! :action_controller, :action_view, :sprockets do
end
