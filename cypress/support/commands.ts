
Cypress.Commands.add('login', () => {
  cy.request('POST', '/api/auth', { user: 'test', pwd: 'test' })
    .then(res => {
      window.localStorage.setItem('token', res.body.token);
    });
});

Cypress.Commands.add('visitAuth', (url: string) => {
  cy.login();
  cy.visit(url);
});
