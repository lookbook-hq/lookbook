module Shared
  class MethodList < Shared::Base
    renders_many :methods, Shared::MethodInfo
  end
end
