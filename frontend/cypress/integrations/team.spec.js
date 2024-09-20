describe('Test de la page des équipes', () => {
    before(() => {
      cy.visit('/');
      cy.get('input[placeholder="Email"]').type('test@example.com');
      cy.get('input[placeholder="Mot de passe"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/teams');
    });
  
    it('devrait afficher la liste des équipes', () => {
      cy.get('ul').should('be.visible');
      cy.get('ul li').should('have.length.greaterThan', 0); 
    });
  
    it('devrait permettre de créer une nouvelle équipe', () => {
      cy.contains('Créer une équipe').click();
      cy.get('input[placeholder="Nom de l\'équipe"]').type('Nouvelle équipe de test');
      cy.get('button[type="submit"]').click();
      cy.contains('Nouvelle équipe de test').should('be.visible');
    });
  
    it('devrait permettre de supprimer une équipe', () => {
      cy.contains('Nouvelle équipe de test').parent().contains('Supprimer').click();
      cy.contains('Nouvelle équipe de test').should('not.exist');
    });
  });
  