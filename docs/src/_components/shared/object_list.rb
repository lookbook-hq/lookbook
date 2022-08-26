module Shared
  class ObjectList < Shared::Base
    renders_many :objects, Shared::ObjectInfo
  end
end
