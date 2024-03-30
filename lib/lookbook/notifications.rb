module Lookbook
  class Notifications
    include Enumerable

    delegate :each, to: :@notifications

    def initialize
      @notifications = []
    end

    def add(*args)
      type, detail = args.first.is_a?(StandardError) ? [:error, args.first] : args
      @notifications << Notification.new(type.to_sym, detail)
    end

    def errors
      @notifications.select { _1.type == :error }
    end

    def errors?
      errors.any?
    end

    def warnings
      @notifications.select { _1.type == :warning }
    end

    def warnings?
      warnings.any?
    end

    def notices
      @notifications.select { _1.type == :notice }
    end

    def notices?
      notices.any?
    end

    def clear
      @notifications = []
    end

    Notification = Struct.new(:type, :detail)
  end
end
