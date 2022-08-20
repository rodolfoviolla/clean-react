const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    fixturesFolder: 'src/main/test/cypress/fixtures',
    supportFile: 'src/main/test/cypress/support/commands.ts',
    specPattern: 'src/main/test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
})
