import { faker } from '@faker-js/faker'

import {
  testUrl,
  testLocalStorageItem,
  getAnyOtherErrorStatusCodeThan,
  testInputElements,
  testErrorMessage
} from '../utils'

const path = /login/

const populateFieldsWithValidValues = () => {
  cy.getByTestId('email').type(faker.internet.email())
  cy.getByTestId('password').type(faker.random.alphaNumeric(5))

  return {
    submitWithClick: () => cy.getByTestId('submit').click(),
    submitWithEnter: () => cy.getByTestId('password').type('{enter}')
  }
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    testInputElements('email', 'Campo obrigatório')
    testInputElements('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    testInputElements('email', 'Campo inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    testInputElements('password', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFieldsWithValidValues()
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', path, { statusCode: 401 })
    populateFieldsWithValidValues().submitWithClick()
    testErrorMessage('Credenciais inválidas')
    testUrl('/login')
  })

  it('Should present UnexpectedError on any other errors', () => {
    cy.intercept('POST', path, { statusCode: getAnyOtherErrorStatusCodeThan([401]) })
    populateFieldsWithValidValues().submitWithClick()
    testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    testUrl('/login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', path, { statusCode: 200, fixture: 'account' })
    populateFieldsWithValidValues().submitWithClick()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('errorMessage').should('not.exist')
    testUrl('/')
    testLocalStorageItem('account')
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', path, { statusCode: 200, fixture: 'account' }).as('request')
    populateFieldsWithValidValues()
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', path, { statusCode: 200, fixture: 'account' }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
