const path= require("path")
 


module.exports = {
  "stories": [
    "../src/**/*.stories.js",
    "../src/**/stories.js"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions"
  ],
  "webpackFinal": (config)=> {
    config.resolve.alias['core-js/modules'] =  path.resolve(
            __dirname,
            '..',
            'node_modules/@storybook/core/node_modules/core-js/modules'
        );
    return config
  }
}