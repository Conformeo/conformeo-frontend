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
    cy.get('input[formControlName="email"]').type('testuser@example.com');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.wait('@loginReq');

    cy.window().its('localStorage.access_token').should('equal', 'fake-token');

    // On attend maintenant /dashboard
    cy.location('pathname').should('eq', '/dashboard');

    cy.get('app-dashboard').should('exist');
  });

  it('login fails and shows error', () => {
    cy.intercept('POST', `${api}/auth/login`, {
      statusCode: 401,
      body: { detail: 'Identifiants invalides' }
    }).as('loginFail');

    cy.visit('/login');
    cy.get('input[formControlName="email"]').type('wrong@example.com');
    cy.get('input[formControlName="password"]').type('badpass1');
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.wait('@loginFail');

    cy.get('.error')
      .should('be.visible')
      .and('contain.text', 'Identifiants invalides');

    cy.location('pathname').should('eq', '/login');
  });
});
