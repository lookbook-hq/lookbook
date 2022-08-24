module Lookbook
  module Panels
    def define_panel(name, opts = {})
      Lookbook.config.define_inspector_panel(name, opts)
    end

    def amend_panel(name, opts = {})
      Lookbook.amend_inspector_panel(name, opts)
    end

    def remove_panel(name)
      Lookbook.remove_inspector_panel(name)
    end
  end
end