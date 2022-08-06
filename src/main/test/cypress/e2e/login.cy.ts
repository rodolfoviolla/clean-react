import { faker } from '@faker-js/faker'

import * as formHelpers from '../support/formHelpers'
import { getAnyOtherErrorStatusCodeThan } from '../support/mockHttp'

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
    formHelpers.testInputElements('email', 'Campo obrigatório')
    formHelpers.testInputElements('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    formHelpers.testInputElements('email', 'Campo inválido')

    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    formHelpers.testInputElements('password', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFieldsWithValidValues()
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, { statusCode: 401 })
    populateFieldsWithValidValues().submitWithClick()
    formHelpers.testErrorMessage('Credenciais inválidas')
    formHelpers.testUrl('/login')
  })

  it('Should present UnexpectedError on any other errors', () => {
    cy.intercept('POST', /login/, { statusCode: getAnyOtherErrorStatusCodeThan([401]) })
    populateFieldsWithValidValues().submitWithClick()
    formHelpers.testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    formHelpers.testUrl('/login')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { [faker.database.column()]: faker.datatype.uuid() } })
    populateFieldsWithValidValues().submitWithEnter()
    formHelpers.testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    formHelpers.testUrl('/login')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } })
    populateFieldsWithValidValues().submitWithClick()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('errorMessage').should('not.exist')
    formHelpers.testUrl('/')
    formHelpers.testLocalStorageItem('accessToken')
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } }).as('request')
    populateFieldsWithValidValues()
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
