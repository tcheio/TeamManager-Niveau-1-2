describe('Test de la page de connexion', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('devrait afficher le formulaire de connexion', () => {
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Mot de passe"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('devrait permettre de se connecter avec des identifiants valides', () => {
      cy.get('input[placeholder="Email"]').type('test@example.com');
      cy.get('input[placeholder="Mot de passe"]').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/teams');
    });
  
    it('devrait afficher une erreur avec des identifiants incorrects', () => {
      cy.get('input[placeholder="Email"]').type('wrong@example.com');
      cy.get('input[placeholder="Mot de passe"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Erreur lors de la connexion').should('be.visible');
    });
  });
  