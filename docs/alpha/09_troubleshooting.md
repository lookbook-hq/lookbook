# Lookbook v3 alpha

## Troubleshooting & known issues

If you are trying to update to the v3 alpha release from a previous version of Lookbook there are a number of issues you are likely to run into at this point, depending on your setup and how heavily you have customised your Lookbook install. 

### 💥 Custom panels/tags/param inputs

The APIs for [extending the Lookbook UI](https://lookbook.build/extend) have not been re-implemented in the v3 alpha yet. You will need to remove/comment out any code related to custom panels, tags and param inputs in your application or you will see errors in your app that prevent it from starting.

### 💥 Config options

Only a subset of the v2 config options have currently been implemented in the v3 alpha release at this time, and some have been renamed.

If you are attempting to set unimplemented config options you may see errors that prevent your app starting.

> The currently implemented v3 configuration options are not yet documented, but can be seen in the [config.rb](lib/lookbook/config.rb) file.

### 💥 External embeds

The external preview embeds functionality has not yet been re-implemented. Preview embeds will currently only work within Lookbook documentation pages at this time

### 💥 Theming

Lookbook v3 will feature a totally overhauled, CSS variable-based theming system. Existing themes will not have any effect on the v3 alpha release UI.


