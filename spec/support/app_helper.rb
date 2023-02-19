module AppHelper
  def self.rails_older_than?(version)
    Gem::Version.new(Rails.version) < Gem::Version.new(version)
  end

  def self.rails_newer_than?(version)
    Gem::Version.new(Rails.version) >= Gem::Version.new(version)
  end

  def self.phlexible?
    rails_newer_than?(6.1)
  end

  def preview_path(file = nil)
    path = Rails.root.join("test/components/previews")
    file.nil? ? path : path.join(file)
  end

  def page_path(file = nil)
    path = Rails.root.join("test/components/docs")
    file.nil? ? path : path.join(file)
  end
end
