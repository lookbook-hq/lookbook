
# Lookbook v3 alpha

## Usage

Below are instructions on how install the Lookbook v3 alpha release in your app.

These early alpha releases are intended to give existing Lookbook users a sneak peak at some of the new features and improvements coming in v3. 

There is much still left to do and undoubtably many bugs at this stage but any feedback, suggestions and/or bug reports would be much appreciated.

> New users to Lookbook should head over to the [v2.x doc site](https://lookbook.build) for details on how to get started with the current stable branch.

### Requirements

* Ruby >= 3.1.0
* Rails >= 7.1.0

### Installing 

_For adding the v3 alpha into a new project with no existing Lookbook install._

Add Lookbook to the `development` group in your Gemfile:

```rb
group :development do
  gem "lookbook", "~> 3.0.0.alpha.2"
  gem "listen" # Required for 'live' UI updates when file changes are detected
end
```

Run `bundle` to install the Lookbook gem and then start your server in the usual way.

Lookbook will automatically be mounted at `/lookbook` within your app when the server is started.

### Updating

_For apps that already have an existing Lookbook installation._

**Remove the Lookbook engine mounting code** from your `config/routes.rb` file (Lookbook now mounts itself automatically in development and test environments):

```rb
# Remove this!
if Rails.env.development?
  mount Lookbook::Engine, at: "/lookbook"
end
```

If you are not using ActionCable directly in your application and only [installed it for use with Lookbook](https://lookbook.build/guide/installation#step-3), you can **remove it** from your `Gemfile`:

```rb
gem "actioncable" # Remove this!
```

> However _do not_ remove the `listen` gem - Lookbook needs it to enable live UI updates in development.

Lastly **update the Lookbook version** in your `Gemfile`:

```rb
gem "lookbook", "~> 3.0.0.alpha.2"
```

Run `bundle update lookbook` to update to the latest Lookbook alpha release and then start your server in the usual way.

Lookbook will automatically be mounted at `/lookbook` within your app when the server is started.

**See the [troubleshooting section](./09_troubleshooting.md) page if you are seeing errors or having problems after updating.**

