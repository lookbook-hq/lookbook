module PathsHelper
  def preview_path(file = nil)
    path = Rails.root.join("test/components/previews")
    file.nil? ? path : path.join(file)
  end

  def page_path(file = nil)
    path = Rails.root.join("test/components/docs")
    file.nil? ? path : path.join(file)
  end
end
