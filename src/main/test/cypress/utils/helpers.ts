const baseUrl: string = Cypress.config().baseUrl

export const testUrl = (path: string) => {
  cy.url().should('equal', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string) => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key))
}
