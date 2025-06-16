// cypress/support/commands.ts

Cypress.Commands.add('login', () => {
  window.localStorage.setItem('token', 'fake-jwt-token');
});

Cypress.Commands.add('visitAuth', (url: string) => {
  cy.login();
  cy.visit(url);
});
