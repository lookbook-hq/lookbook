module Views::Phlex
	class Example < Phlex::HTML
		def initialize(emoji:)
			@emoji = emoji
		end

		def view_template
			div class: "prose text-center mx-auto p-8 rounded-lg bg-green-50 border-dashed border-2 border-green-400" do
				h3(class: "text-xl font-bold mb-4") { "Phlex example #{@emoji}" }
				p { "This is a Phlex component being rendered by Lookbook." }
			end
		end
	end
end
