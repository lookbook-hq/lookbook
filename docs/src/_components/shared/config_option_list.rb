module Shared
  class ConfigOptionList < Shared::Base
    renders_many :config_options, Shared::ConfigOptionInfo
  end
end