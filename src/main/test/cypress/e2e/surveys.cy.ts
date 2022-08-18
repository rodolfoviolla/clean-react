import { faker } from '@faker-js/faker'

import { setLocalStorageItem } from '../support/helpers'
import { getAnyOtherErrorStatusCodeThan } from '../support/mockHttp'

describe('Surveys', () => {
  beforeEach(() => {
    setLocalStorageItem('account', { name: faker.name.findName(), accessToken: faker.datatype.uuid() })
  })

  it('Should present error on UnexpectedError', () => {
    cy.intercept('GET', /surveys/, { statusCode: getAnyOtherErrorStatusCodeThan([403]) })
    cy.visit('/')
    cy.getByTestId('error-message').should('contain.text', 'Ocorreu um erro inesperado. Tente novamente mais tarde')
  })
})
