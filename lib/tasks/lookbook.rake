
namespace :lookbook do
  namespace :assets do
    task :compile do
      Dir.chdir(File.join(__dir__, "../..")) do
        sh "npm install & npm run build"
      end
    end
  end
end