import { faker } from '@faker-js/faker'

import * as formHelpers from '../support/formHelpers'
import { getAnyOtherErrorStatusCodeThan } from '../support/mockHttp'

const populateFieldsWithValidValues = () => {
  cy.getByTestId('name').type(faker.name.findName())
  formHelpers.testInputElements('name')
  cy.getByTestId('email').type(faker.internet.email())
  formHelpers.testInputElements('email')
  const password = faker.internet.password(5)
  cy.getByTestId('password').type(password)
  formHelpers.testInputElements('password')
  cy.getByTestId('passwordConfirmation').type(password)
  formHelpers.testInputElements('passwordConfirmation')

  return {
    submitWithClick: () => cy.getByTestId('submit').click(),
    submitWithEnter: () => cy.getByTestId('passwordConfirmation').type('{enter}')
  }
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    formHelpers.testInputElements('name', 'Campo obrigatório')
    formHelpers.testInputElements('email', 'Campo obrigatório')
    formHelpers.testInputElements('password', 'Campo obrigatório')
    formHelpers.testInputElements('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alpha(3))
    formHelpers.testInputElements('name', 'Campo inválido')
    cy.getByTestId('email').type(faker.random.word())
    formHelpers.testInputElements('email', 'Campo inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    formHelpers.testInputElements('password', 'Campo inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(5))
    formHelpers.testInputElements('passwordConfirmation', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFieldsWithValidValues()
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    cy.intercept('POST', /signup/, { statusCode: 403 })
    populateFieldsWithValidValues().submitWithClick()
    formHelpers.testErrorMessage('Este e-mail está em uso')
    formHelpers.testUrl('/signup')
  })

  it('Should present UnexpectedError on any other errors', () => {
    cy.intercept('POST', /signup/, { statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    populateFieldsWithValidValues().submitWithClick()
    formHelpers.testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    formHelpers.testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data are provided', () => {
    cy.intercept('POST', /signup/, { statusCode: 200, body: { [faker.database.column()]: faker.random.word() } })
    populateFieldsWithValidValues().submitWithClick()
    formHelpers.testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    formHelpers.testUrl('/signup')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /signup/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } })
    populateFieldsWithValidValues().submitWithEnter()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('errorMessage').should('not.exist')
    formHelpers.testLocalStorageItem('accessToken')
    formHelpers.testUrl('/')
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /signup/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } }).as('request')
    populateFieldsWithValidValues()
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /signup/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
