module DataSources
  class Partials < ::Nanoc::DataSource
    identifier :partials

    def layouts_dir_name
      "partials"
    end

    def layouts
      dir_name = tools.expand_and_relativize_path(layouts_dir_name)
      file_paths = tools.all_files_in(dir_name, nil)

      file_paths.map do |path|
        basename = File.basename(path).sub(/(\.[^\/]+$)/, "")
        new_layout(tools.read_file(path, config: nil), {}, "/#{basename}")
      end
    end

    def layout_changes
      changes_for_dir(layouts_dir_name)
    end

    def changes_for_dir(dir)
      require "listen"

      ::Nanoc::Core::ChangesStream.new do |cl|
        full_dir = dir ? File.expand_path(dir) : nil

        if full_dir && File.directory?(full_dir)
          listener =
            Listen.to(full_dir) do |_modifieds, _addeds, _deleteds|
              cl.unknown
            end

          listener.start

          cl.to_stop { listener.stop }
        end

        sleep
      end
    end

    private

    def tools
      ::Nanoc::DataSources::Filesystem::Tools
    end
  end
end
