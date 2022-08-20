import { getLocalStorageItem, setLocalStorageItem, testUrl, getAnyOtherErrorStatusCodeThan } from '../utils'

const path = /surveys/

describe('Surveys', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => setLocalStorageItem('account', account))
  })

  it('Should present error on UnexpectedError', () => {
    cy.intercept('GET', path, { statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    cy.getByTestId('error-message').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente mais tarde')
  })

  it('Should logout on AccessDeniedError', () => {
    cy.intercept('GET', path, { statusCode: 403 })
    cy.visit('/')
    testUrl('/login')
  })

  it('Should present correct username', () => {
    cy.intercept('GET', path, { statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    cy.intercept('GET', path, { statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    cy.getByTestId('logout').click()
    testUrl('/login')
  })
})
