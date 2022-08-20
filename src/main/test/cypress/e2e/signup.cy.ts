import { faker } from '@faker-js/faker'
import { RouteHandler } from 'cypress/types/net-stubbing'

import {
  testLocalStorageItem,
  testUrl,
  getAnyOtherErrorStatusCodeThan,
  testInputElements,
  testErrorMessage
} from '../utils'

const populateFieldsWithValidValues = () => {
  cy.getByTestId('name').type(faker.name.findName())
  testInputElements('name')
  cy.getByTestId('email').type(faker.internet.email())
  testInputElements('email')
  const password = faker.internet.password(5)
  cy.getByTestId('password').type(password)
  testInputElements('password')
  cy.getByTestId('passwordConfirmation').type(password)
  testInputElements('passwordConfirmation')

  return {
    submitWithClick: () => cy.getByTestId('submit').click(),
    submitWithEnter: () => cy.getByTestId('passwordConfirmation').type('{enter}')
  }
}

const mockHttpResponse = (response: RouteHandler) => cy.intercept('POST', /signup/, response)

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('Should load with correct initial state', () => {
    testInputElements('name', 'Campo obrigatório')
    testInputElements('email', 'Campo obrigatório')
    testInputElements('password', 'Campo obrigatório')
    testInputElements('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alpha(3))
    testInputElements('name', 'Campo inválido')
    cy.getByTestId('email').type(faker.random.word())
    testInputElements('email', 'Campo inválido')
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    testInputElements('password', 'Campo inválido')
    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(5))
    testInputElements('passwordConfirmation', 'Campo inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    populateFieldsWithValidValues()
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    mockHttpResponse({ statusCode: 403 })
    populateFieldsWithValidValues().submitWithClick()
    testErrorMessage('Este e-mail está em uso')
    testUrl('/signup')
  })

  it('Should present UnexpectedError on any other errors', () => {
    mockHttpResponse({ statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    populateFieldsWithValidValues().submitWithClick()
    testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    testUrl('/signup')
  })

  it('Should save accessToken if valid credentials are provided', () => {
    mockHttpResponse({ statusCode: 200, fixture: 'account' })
    populateFieldsWithValidValues().submitWithEnter()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('errorMessage').should('not.exist')
    testLocalStorageItem('account')
    testUrl('/')
  })

  it('Should prevent multiple submits', () => {
    mockHttpResponse({ statusCode: 200, fixture: 'account' }).as('request')
    populateFieldsWithValidValues()
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    mockHttpResponse({ statusCode: 200, fixture: 'account' }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
