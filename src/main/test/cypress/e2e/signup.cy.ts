import { faker } from '@faker-js/faker'

import * as formHelpers from '../support/formHelpers'

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
    cy.getByTestId('name').type(faker.name.findName())
    formHelpers.testInputElements('name')
    cy.getByTestId('email').type(faker.internet.email())
    formHelpers.testInputElements('email')
    const password = faker.internet.password(5)
    cy.getByTestId('password').type(password)
    formHelpers.testInputElements('password')
    cy.getByTestId('passwordConfirmation').type(password)
    formHelpers.testInputElements('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
