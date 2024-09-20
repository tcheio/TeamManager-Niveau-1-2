describe('Gestion des équipes', () => {
    before(() => {
      cy.visit('/');
      cy.get('input[placeholder="Email"]').type('test@example.com');
      cy.get('input[placeholder="Mot de passe"]').type('password');
      cy.contains('Se connecter').click();
    });
  
    it('devrait permettre de créer une équipe', () => {
      cy.contains('Créer une équipe').click();
      cy.get('input[placeholder="Nom de l\'équipe"]').type('Nouvelle Équipe');
      cy.contains('Créer').click();
      cy.contains('Nouvelle Équipe').should('exist');
    });
  
    it('devrait permettre de modifier une équipe', () => {
      cy.contains('Nouvelle Équipe').click();
      cy.get('input[placeholder="Nom de l\'équipe"]').clear().type('Équipe Modifiée');
      cy.get('textarea').clear().type('Nouvelle description');
      cy.contains('Enregistrer les modifications').click();
      cy.contains('Équipe Modifiée').should('exist');
    });
  
    it('devrait permettre de supprimer une équipe', () => {
      cy.contains('Équipe Modifiée').parent().contains('Supprimer').click();
      cy.contains('Équipe Modifiée').should('not.exist');
    });
  });
  