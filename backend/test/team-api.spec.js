const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../api');

let server; 
let token;

describe('Teams API', () => {
  beforeAll(async () => {
    server = app.listen(4000, () => {
      console.log('Serveur de test démarré');
    });

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'tcheio@mail.com', password: 'azerty' });

    token = response.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.close(); 
    await server.close(); 
  });

  it('devrait récupérer toutes les équipes de l\'utilisateur', async () => {
    const response = await request(app)
      .get('/teams')
      .set('Authorization', `Bearer ${token}`);

    console.log("test complet");
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("ne devrait pas trouver l'\équipe et ne rien mettre à jour une équipe", async () => {
    const response = await request(app)
      .put('/teams/66ec4a4c2eca028f13294602') //Cette équipe n'existe pas
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Team', description: 'Updated description' });

    expect(response.statusCode).toBe(403);
  });
});
