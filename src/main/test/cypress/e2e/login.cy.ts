import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('email-label').should('have.attr', 'title', 'Campo obrigatório')

    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password-label').should('have.attr', 'title', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email')
      .type(faker.random.word())
      .should('have.attr', 'title', 'EMAIL: Campo inválido')
    cy.getByTestId('email-label')
      .should('have.attr', 'title', 'EMAIL: Campo inválido')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')

    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(3))
      .should('have.attr', 'title', 'PASSWORD: Campo inválido')
    cy.getByTestId('password-label')
      .should('have.attr', 'title', 'PASSWORD: Campo inválido')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email')
      .type(faker.internet.email())
      .should('not.have.attr', 'title')
    cy.getByTestId('email-label')
      .should('not.have.attr', 'title')
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')

    cy.getByTestId('password')
      .type(faker.random.alphaNumeric(5))
      .should('not.have.attr', 'title')
    cy.getByTestId('password-label')
      .should('not.have.attr', 'title')
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, { statusCode: 401 })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('error-message').should('contain.text', 'Credenciais inválidas')
    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on any other errors', () => {
    const statusCode = faker.internet.httpStatusCode({ types: ['serverError', 'clientError'] })
    cy.intercept('POST', /login/, { statusCode: statusCode === 401 ? statusCode + 1 : statusCode })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('error-message').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente mais tarde')
    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { [faker.database.column()]: faker.datatype.uuid() } })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5)).type('{enter}')

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('error-message').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente mais tarde')
    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } })

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('equal', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } }).as('request')

    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password(5))
    cy.getByTestId('submit').dblclick()

    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', /login/, { statusCode: 200, body: { accessToken: faker.datatype.uuid() } }).as('request')
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
