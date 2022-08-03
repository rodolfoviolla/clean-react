const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: false,
    specPattern: 'src/main/test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
})
