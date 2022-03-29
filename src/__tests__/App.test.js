import React from 'react'
import { mount } from '@cypress/react'
import App from '../components/Core/AppCore'

describe('App.js', () => {
  beforeEach(() => {
    mount(<App agent="testing" />)
  })

  it('renders App component', () => {
    cy.get('[data-cy=app-core]').should('exist').contains('Drone Pilot')
  })
})
