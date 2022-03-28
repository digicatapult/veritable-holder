import * as env from '../../src/utils/env'

/*
  This is the most basic configuration so please
  threat the below tests as placeholders
*/
function mockAgentEndpoints(url) {
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/status?`,
    },
    { fixture: 'agent-status.json'}
  ).as('agentStatus')
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/connections?`,
    },
    []
  ).as('agentConnections')
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/credentials?`,
    },
    []
  ).as('agentCredentials')
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/resent-proof-2.0/records?`,
    },
    { results: []}
  ).as('agentRecords')
}

describe('Integration tests for Holder persona', () => {
  const url = env.HOLDER_ORIGIN
  beforeEach(() => {
    mockAgentEndpoints(url)
  })

  describe('happy path', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
      if (!cy.contains('Drone Pilot')) {
        cy.get('.auth0-lock-input-username .auth0-lock-input').clear().type('EMAIL');
        cy.get('.auth0-lock-input-password .auth0-lock-input').clear().type('Password');
        cy.get('.auth0-lock-submit').click();
      }
    })

    it('renders DOM', () => {
      cy.get('#root').should('exist')
    })
    
    describe('if agent does not respond', () => {
      it('renders a modal along with the error message', () => {
        cy.intercept('GET', `${url}/status?`, { forceNetworkError: true }).as('agentStatusErr')
        cy.get('[data-cy=switch-to-custom-endpoint]').click()
        cy.wait('@agentStatusErr').should('have.property', 'error')
          // assert for modal etc
          // cy.get('[data-cy=modal-server-error]')
          //   .should('exist')
          //   .contains(networkErrorMessage)
      })
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
