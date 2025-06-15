describe('${feature^} Page', () => {
  beforeEach(() => {
    cy.visit('/$feature');
  });

  it('devrait afficher la page ${feature}', () => {
    cy.get('app-${feature}-page').should('exist');
  });
});
