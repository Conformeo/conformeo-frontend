// cypress/e2e/login.cy.ts
describe('E2E – Login & Dashboard', () => {
  const api = Cypress.env('API_URL');

  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('login succeeds and redirects to dashboard', () => {
    cy.intercept('POST', `${api}/auth/login`, {
      statusCode: 200,
      body: { access_token: 'fake-token', token_type: 'bearer' }
    }).as('loginReq');

    cy.visit('/login');
    cy.get('input[id="email"]').type('testuser@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.wait('@loginReq');

    cy.window().its('localStorage.access_token').should('equal', 'fake-token');
    cy.url().should('include', '/dashboard');

    // On vérifie l'existence du composant dashboard
    cy.get('app-dashboard').should('exist');
    // ou, si tu veux checker le texte :
    // cy.contains('dashboard works!').should('exist');
  });

  it('login fails and shows error', () => {
    cy.intercept('POST', `${api}/auth/login`, {
      statusCode: 401,
      body: { detail: 'Identifiants invalides' },
    }).as('loginFail');

    cy.visit('/login');
    cy.get('input[id="email"]').type('wrong@example.com');
    // mot de passe à 8 caractères pour débloquer le bouton :
    cy.get('input[id="password"]').type('badpass1');
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.wait('@loginFail');

    cy.get('.error').should('contain', 'Identifiants incorrects');
    cy.url().should('include', '/login');
  });
});
