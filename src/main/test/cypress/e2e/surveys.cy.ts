import { RouteHandler } from 'cypress/types/net-stubbing'

import { getLocalStorageItem, setLocalStorageItem, testUrl, getAnyOtherErrorStatusCodeThan } from '../utils'

const mockHttpResponse = (response: RouteHandler) => cy.intercept('GET', /surveys/, response).as('request')

describe('Surveys', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => setLocalStorageItem('account', account))
  })

  it('Should present error on UnexpectedError', () => {
    mockHttpResponse({ statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    cy.getByTestId('error-message').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente mais tarde')
  })

  it('Should reload on button click', () => {
    mockHttpResponse({ statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    cy.getByTestId('error-message').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente mais tarde')
    mockHttpResponse({ statusCode: 200, fixture: 'surveys' })
    cy.getByTestId('retry').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('Should logout on AccessDeniedError', () => {
    mockHttpResponse({ statusCode: 403 })
    cy.visit('/')
    testUrl('/login')
  })

  it('Should present correct username', () => {
    mockHttpResponse({ statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockHttpResponse({ statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    cy.getByTestId('logout').click()
    testUrl('/login')
  })

  it('Should present survey items', () => {
    mockHttpResponse({ statusCode: 200, fixture: 'surveys' })
    cy.visit('/')
    cy.get('li:empty').should('have.length', 4)
    cy.wait('@request')
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'any_question_1')
      cy.fixture('icon').then(icon => assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp))
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '05')
      assert.equal(li.find('[data-testid="month"]').text(), 'mar')
      assert.equal(li.find('[data-testid="year"]').text(), '2022')
      assert.equal(li.find('[data-testid="question"]').text(), 'any_question_2')
      cy.fixture('icon').then(icon => assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown))
    })
  })
})
