module Lookbook
  module Panels
    def define_panel(name, *args)
      Lookbook.config.define_inspector_panel(name, extract_opts(args))
    end

    def amend_panel(name, *args)
      Lookbook.amend_inspector_panel(name, extract_opts(args))
    end

    def remove_panel(name)
      Lookbook.remove_inspector_panel(name)
    end

    def extract_opts(args)
      if args.many?
        opts = args[1]
        opts[:partial] = args[0]
        opts
      elsif args.any?
        args[0].is_a?(String) ? {partial: args[0]} : args[0]
      end
    end
  end
end
