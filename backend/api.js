const express = require('express');
const cors = require('cors');
const { connectToMongo, getAllTeams, addTeam, deleteTeam, ObjectId } = require('./mongoDbConnect');  
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/teams', async (req, res) => {
  try {
    const teams = await getAllTeams();
    console.log("Team récupéré");
    
    res.json(teams);
  } catch (error) {
    console.error('Erreur lors de la récupération des équipes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des équipes' });
  }
});

app.post('/add-team', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Le nom de l\'équipe est requis' });
  }

  try {
    const teamId = await addTeam(name);
    res.status(201).json({ _id: teamId, name });
    console.log("Team ajouté");
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'équipe:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'équipe' });
  }
});

app.delete('/delete-team/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const success = await deleteTeam(id);
    if (success) {
      res.json({ message: 'Équipe supprimée avec succès' });
      console.log("Team supprimé");
    } else {
      res.status(404).json({ message: 'Équipe non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipe:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'équipe' });
  }
});



app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
