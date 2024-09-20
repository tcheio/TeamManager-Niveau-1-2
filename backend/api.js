const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/team');
const memberRoutes = require('./routes/member');
const Utilisateur = require('./model/utilisateur');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/', teamRoutes);
app.use('/', memberRoutes);

mongoose.connect('mongodb://localhost:27017/tournament-team-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connecté'))
  .catch((error) => console.error('Erreur de connexion à MongoDB', error));

app.get('/users', async (req, res) => {
  try {
    const users = await Utilisateur.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;