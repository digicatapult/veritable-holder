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
    { fixture: 'agent-status.json' }
  ).as('agentStatus')
  cy.intercept(
    {
      method: 'POST',
      url: `${url}/multitenancy/wallet?`,
    },
    { body: {} }
  ).as('createWallet')
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/connections?`,
    },
    { results: [] }
  ).as('agentConnections')
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/credentials?`,
    },
    { results: [] }
  ).as('agentCredentials')
  cy.intercept(
    {
      method: 'GET',
      url: `${url}/resent-proof-2.0/records?`,
    },
    { results: [] }
  ).as('agentRecords')
}

describe('Integration tests for Holder persona', () => {
  const url = `${env.HOLDER_ORIGIN}/v1/aca-py`

  before(() => {
    cy.clearCookies({ domain: null })
    cy.clearLocalStorage({ domain: null })
  })

  before(() => {
    cy.visit('http://localhost:3000')
    cy.get('#username').clear().type(Cypress.env('TEST_USERNAME'))
    cy.get('#password').clear().type(Cypress.env('TEST_PASSWORD'))
    cy.get('.cf11996fb.c94d14336').submit()
  })

  beforeEach(() => {
    mockAgentEndpoints(url)
  })

  describe('happy path', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('renders DOM', () => {
      cy.get('#root').should('exist')
    })

    describe('if agent does not respond', () => {
      it('renders a modal along with the error message', () => {
        cy.intercept('GET', `${url}/status?`, { forceNetworkError: true }).as(
          'agentStatusErr'
        )
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

      it("retrieves agent 's status from `/status?` endpoint", () => {
        cy.wait('@agentStatus').then(({ response }) => {
          assert.equal(response.statusCode, 200)
        })
      })

      it('asserts a new wallet via the `/multitenancy/wallet?` endpoint', () => {
        cy.wait('@createWallet').then(({ response }) => {
          assert.equal(response.statusCode, 200)
        })
      })

      it("gets list of connections from '/connections?' endpoint", () => {
        cy.wait('@agentConnections').then(({ response }) => {
          assert.equal(response.statusCode, 200)
        })
      })

      it("retrieves credentials from '/credentials?' endpoint", () => {
        cy.wait('@agentCredentials').then(({ response }) => {
          assert.equal(response.statusCode, 200)
        })
      })
    })
  })
})
