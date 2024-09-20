const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    supportFile: 'cypress/support/index.js',
    fixturesFolder: 'cypress/fixtures', 
    screenshotsFolder: 'cypress/screenshots', 
    videosFolder: 'cypress/videos',
    specPattern: 'cypress/integration/**/*.spec.js', 
    setupNodeEvents(on, config) {

    },
  },
});
