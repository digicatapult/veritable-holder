import React from 'react'
import { mount } from '@cypress/react'
import App from '../App'

describe('App.js', () => {
  beforeEach(() => {
    mount(<App agent="testing" />)
  })

  it('renders App component', () => {
    cy.get('[data-cy=app]').should('exist').contains('Drone Pilot')
  })
})
