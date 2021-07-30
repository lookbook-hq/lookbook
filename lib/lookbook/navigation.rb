module Lookbook
  class Navigation
    
    def initialize(previews, active_path = nil)
      @previews = previews
      @active_path = active_path
    end

    def previews
      valid = @previews.filter { |preview| preview.unsorted_examples.any? && !preview.hidden? }
      valid.sort_by(&:normalized_name)
    end

    def flat
      {
        flat: true,
        depth: 0,
        items: previews.map do |preview|
          nav_item_for_preview(preview, expand_name: true)
        end
      }
    end

    def nested
      nav = {flat: false, depth: 0, items: []}
      previews.each do |preview|
        current = nav
        depth = preview.path_parts.size
        path = ""
        preview.path_parts.each_with_index do |segment, i|
          target = current[:items].find { |item| item[:name] == segment }
          if target.nil?
            path = "#{path.present? ? path + "." : ""}#{segment}"
            target = {
              depth: i + 1,
              nested: true,
              name: path,
              label: segment.titleize,
              type: :group,
              items: []
            }
            current[:items].append(target)
          end
          if depth == i + 1
            target[:items].push(nav_item_for_preview(preview))
          else
            current = target
          end
        end
      end
      nav
    end

    private

    def nav_item_for_preview(preview, expand_name: false)
      {
        name: preview.preview_name.gsub('/','.'),
        label: expand_name ? "#{preview.pretty_path}/#{preview.label}" : preview.label,
        type: :preview,
        examples: preview.unsorted_examples.map do |example|
          example_path = "#{preview.preview_name}/#{example}"
          {
            name: example,
            label: example.titleize,
            path: example_path,
            active: example_path == @active_path
          }
        end
      } 
    end

  end
end
    