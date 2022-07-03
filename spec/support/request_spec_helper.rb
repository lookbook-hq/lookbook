module RequestSpecHelper
  def html
    Capybara.string(response.body)
  end

  def load_previews
    Lookbook.config.preview_paths = preview_paths
    Lookbook::Preview.clear_cache
  end

  def unload_previews
    Lookbook.config.preview_paths = []
    Lookbook::Preview.clear_cache
  end

  def load_pages
    Lookbook.config.page_paths = page_paths
  end

  def unload_pages
    Lookbook.config.page_paths = []
  end

  def preview_paths
    ["test/components/previews"]
  end

  def page_paths
    ["test/components/docs"]
  end
end
