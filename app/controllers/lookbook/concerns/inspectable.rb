module Lookbook
  module Concerns
    module Inspectable
      extend ActiveSupport::Concern

      protected

      def assign_subject
        @subject = params[:subject]
      end

      def assign_group
        @group = params[:group]
      end

      def assign_scenario
        @scenario = params[:scenario]
      end

      def assign_preview
        @preview = params[:preview]
      end
    end
  end
end
