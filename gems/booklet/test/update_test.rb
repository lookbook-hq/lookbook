require "support/test_helper"

module Booklet
  class UpdateTest < Minitest::Test
    context "Booklet::update" do
      setup do
        @root = Fixtures.dir("changes")
        @original_tree = Booklet.analyze(@root)
      end

      context "return value" do
        setup do
          @updated_tree = Booklet.update(@original_tree)
        end

        should "be an entity tree instance" do
          assert_kind_of EntityTree, @updated_tree
        end

        should "not be the same instance as the original tree" do
          @updated_tree = Booklet.update(@original_tree)
          refute @updated_tree.equal?(@original_tree)
        end
      end

      context "updated files" do
        setup do
          @timestamp = Time.current.to_i.to_s

          @updatable_paths = @original_tree.map { _1.path.to_s }.grep(/updated/)
          @updatable_paths.each { TestUtils.replace_string_in_file(_1, "TIMESTAMP", @timestamp) }

          @updated_tree = Booklet.update(@original_tree)
        end

        teardown do
          @updatable_paths.each { TestUtils.replace_string_in_file(_1, @timestamp, "TIMESTAMP") }
        end

        should "cause their corresponding entities to be updated" do
          changed_spec = @updated_tree.grep(SpecNode).find { _1.name == "updated" }

          assert changed_spec.notes.to_s.include?(@timestamp)
        end
      end

      context "added files" do
        setup do
          @tmp_preview = @root.join("specs/tmp_preview.rb")

          File.write(@tmp_preview, <<~CONTENT)
            module Specs
              class TmpPreview < Lookbook::Preview
                def default
                end
              end
            end
          CONTENT

          @updated_tree = Booklet.update(@original_tree)
        end

        teardown do
          File.delete(@tmp_preview)
        rescue Errno::ENOENT
          # ignore
        end

        should "not be included in the original tree" do
          refute @original_tree.find { _1.path == @tmp_preview }
        end

        should "be included in the file tree" do
          assert @updated_tree.files.find { _1 == @tmp_preview }
        end

        context "entity tree" do
          should "include entities corresponding to the changed files" do
            assert @updated_tree.find { _1.path == @tmp_preview }
          end

          should "have applied the visitors to the new entity nodes" do
            spec = @updated_tree.find { _1.path == @tmp_preview }

            assert 1, spec.scenarios.count

            Booklet.visitors.flatten.each do |visitor|
              assert spec.visited_by.include?(visitor.is_a?(Class) ? visitor : visitor.class)
            end
          end
        end
      end

      context "deleted files" do
        setup do
          @deleted_preview = @root.join("specs/deleted_preview.rb")

          file = File.open(@deleted_preview)
          @deleted_preview_content = file.read

          File.delete(@deleted_preview)

          @updated_tree = Booklet.update(@original_tree)
        end

        teardown do
          File.write(@deleted_preview, @deleted_preview_content)
        end

        should "be included in the original tree" do
          assert @original_tree.find { _1.path == @deleted_preview }
        end

        should "not be included in the file tree" do
          refute @updated_tree.files.find { _1 == @deleted_preview }
        end

        context "entity tree" do
          should "not have entities corresponding to the deleted files" do
            refute @updated_tree.find { _1.path == @deleted_preview }
          end
        end
      end

    end
  end
end
