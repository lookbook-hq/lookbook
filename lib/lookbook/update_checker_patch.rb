module Lookbook
  module UpdateCheckerPatch
    def changed(modified, added, removed)
      super
      if (modified + added + removed).any? { |f| watching?(f) }
        Engine.files_changed(modified:, added:, removed:)
      end
    end
  end
end
