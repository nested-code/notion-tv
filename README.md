## Nested-Notion TV

Find and collect your favourite TV shows in Notion, with calendar entries for episode air dates.

Visit http://notion-tv.netlify.app to use it, or host your own (requires TVDB API keys).

This repository contains the Svelte app for searching TV series and authorizing the integration.\
It also contains the API methods to be served as Netlify functions.

**Nested Notion** is a suite of integrations and tooling for the Notion API by Tim Kinnane.\
Contact at https://twitter.com/timkinnane

### Development

This is a work in progress, the integration with Notion is not complete.

Contributions are welcome, please create an issue to discuss any bug fixes, feature suggestions or
UI enhancements before creating a pull request.

To run a local instance of both the API and app.
  - Clone this repo
  - Use Netlify CLI and create a site in your account
  - Register for access to TVDB for your API key
  - Buy a personal subscription for your user pin
  - Set Netlify env vars `TVDB_API_KEY` and `TVDB_USER_PIN`
  - Run `yarn dev` to launch in local Netlify environment

### Credit

Thanks to Ed Wellbrook for making an API for TVDB that helped inform some methods in this project.
https://github.com/edwellbrook/node-tvdb
