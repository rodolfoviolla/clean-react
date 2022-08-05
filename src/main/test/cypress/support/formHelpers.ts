const baseUrl: string = Cypress.config().baseUrl

export const testInputElements = (field: string, error?: string) => {
  const assertionArgs: [string, any, any] = [error ? 'have.attr' : 'not.have.attr', 'title', error]

  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  cy.getByTestId(field).should(...assertionArgs)
  cy.getByTestId(`${field}-label`).should(...assertionArgs)
}

export const testErrorMessage = (errorMessage: string) => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('error-message').should('contain.text', errorMessage)
}

export const testUrl = (path: string) => {
  cy.url().should('equal', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string) => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}
