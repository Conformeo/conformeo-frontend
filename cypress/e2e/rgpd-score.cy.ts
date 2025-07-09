// cypress/e2e/rgpd-score.cy.ts
describe('RGPD score', () => {
  it('updates when the user answers', () => {
    cy.loginByApi('michel@example.com', 'pass');
    cy.visit('/rgpd/audits/42');

    // coche une réponse
    cy.get('[data-cy=q1_base_legal-yes]').click();

    // le score apparaît > 0
    cy.get('[data-cy=rgpd-score-value]')
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const value = parseFloat(text);
        expect(value).to.be.greaterThan(0);
      });
  });
});
