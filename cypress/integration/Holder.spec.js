import * as env from '../../src/utils/env'

// TODO update fixtures
describe('Integration tests for Holder persona', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: `${env.HOLDER_ORIGIN}/status?`,
      },
      { fixture: 'agent-status.json'}
    ).as('agentStatus')
    cy.intercept(
      {
        method: 'GET',
        url: `${env.HOLDER_ORIGIN}/connections?`,
      },
      []
    ).as('agentConnections')
    cy.intercept(
      {
        method: 'GET',
        url: `${env.HOLDER_ORIGIN}/credentials?`,
      },
      []
    ).as('agentCredentials')
    cy.intercept(
      {
        method: 'GET',
        url: `${env.HOLDER_ORIGIN}/resent-proof-2.0/records?`,
      },
      []
    ).as('agentRecords')
  })

  describe('happy path', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('renders DOM', () => {
      cy.get('#root').should('exist')
    })
    
    describe('connection to agent', () => {
      beforeEach(() => {
        cy.get('[data-cy=switch-to-custom-endpoint]').click()
      })

      it('retrieves agent \'s status from \`/status?\` endpoint', () => {
        cy.wait('@agentStatus').then(({ response }) => {
          assert.equal(response.statusCode, 200) 
        })
      })

     it('gets list of connections from \'/connections?\' endpoint', () => {
       cy.wait('@agentConnections').then(({ response }) => {
         assert.equal(response.statusCode, 200)
       })
      })


     it('retrieves credentials from \'/credentials?\' endpoint', () => {
      cy.wait('@agentCredentials').then(({ response }) => {
        assert.equal(response.statusCode, 200)
      })
     })
    })
  })
})
