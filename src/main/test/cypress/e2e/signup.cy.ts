import { faker } from '@faker-js/faker'

import * as formHelpers from '../support/formHelpers'
import { getAnyOtherErrorStatusCodeThan } from '../support/mockHttp'

const makeValidSubmit = () => {
  cy.getByTestId('name').type(faker.name.findName())
  formHelpers.testInputElements('name')
  cy.getByTestId('email').type(faker.internet.email())
  formHelpers.testInputElements('email')
  const password = faker.internet.password(5)
  cy.getByTestId('password').type(password)
  formHelpers.testInputElements('password')
  cy.getByTestId('passwordConfirmation').type(password)
  formHelpers.testInputElements('passwordConfirmation')

  return { submit: () => cy.getByTestId('submit').click() }
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
    makeValidSubmit()
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    cy.intercept('POST', /signup/, { statusCode: 403 })
    makeValidSubmit().submit()
    formHelpers.testErrorMessage('Este e-mail está em uso')
    formHelpers.testUrl('/signup')
  })

  it('Should present UnexpectedError on any other errors', () => {
    cy.intercept('POST', /signup/, { statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    makeValidSubmit().submit()
    formHelpers.testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    formHelpers.testUrl('/signup')
  })

  it('Should present UnexpectedError if invalid data are provided', () => {
    cy.intercept('POST', /signup/, { statusCode: 200, body: { [faker.database.column()]: faker.random.word() } })
    makeValidSubmit().submit()
    formHelpers.testErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde')
    formHelpers.testUrl('/signup')
  })
})
