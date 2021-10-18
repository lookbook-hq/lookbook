module Lookbook
  class NullLogger
    def unknown(*)
      nil
    end

    def fatal(*)
      nil
    end

    def fatal?
      false
    end

    def error(*)
      nil
    end

    def error?
      false
    end

    def warn(*)
      nil
    end

    def warn?
      false
    end

    def info(*)
      nil
    end

    def info?
      false
    end

    def debug(*)
      nil
    end

    def debug?
      false
    end
  end
end