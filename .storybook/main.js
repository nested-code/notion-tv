module.exports = {
  'stories': [
    '../app/**/*.stories.@(mdx|js|jsx|ts|tsx|svelte)'
  ],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-svelte-csf',
    '@storybook/preset-scss',
    '@storybook/addon-actions',
  ],
  'svelteOptions': {
    'preprocess': require('svelte-preprocess')()
  }
}
