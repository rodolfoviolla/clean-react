import { testUrl } from '../utils'

describe('Private Routes', () => {
  it('Should logout if Surveys has no token', () => {
    cy.visit('/')
    testUrl('/login')
  })
})
