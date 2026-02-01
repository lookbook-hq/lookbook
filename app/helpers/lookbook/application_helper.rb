module Lookbook
  module ApplicationHelper
    def request_path_hash
      Digest::SHA256.hexdigest(request.path)[0..7]
    end
  end
end
