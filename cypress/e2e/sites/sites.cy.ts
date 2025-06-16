/// <reference types="cypress" />

describe('Sites Page', () => {
  beforeEach(() => {
    cy.login();
    cy.intercept('GET', '/api/sites', { fixture: 'sites.json' }).as('getSites');
    cy.visitAuth('/sites');
    cy.wait('@getSites');
  });

  it('devrait afficher la liste des sites', () => {
    cy.get('app-site-table').should('exist');
    cy.get('app-site-table table tbody tr').should('have.length', 2);
    cy.contains('td', 'Siège Social').should('be.visible');
    cy.contains('td', 'Usine Lyon').should('be.visible');
  });

  it('peut filtrer par nom de site', () => {
    cy.get('app-site-filter input').type('Lyon');
    cy.get('app-site-table table tbody tr').should('have.length', 1)
      .first().contains('Usine Lyon');
  });
});
