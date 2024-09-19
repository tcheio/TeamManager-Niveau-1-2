const express = require('express');
const Team = require('../model/team');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/teams', auth, async (req, res) => {
  try {
    // Rechercher toutes les équipes créées par l'utilisateur connecté
    const teams = await Team.find({ userId: req.userId });
    res.json(teams);  // Renvoie les équipes trouvées
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des équipes' });
  }
});


router.post('/add-team', auth, async (req, res) => {
  const { name } = req.body;

  try {
    const existingTeam = await Team.findOne({ userId: req.userId });
    if (existingTeam) {
      return res.status(400).json({ message: 'Vous avez déjà une équipe' });
    }

    const team = new Team({ name, userId: req.userId });
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'équipe', error });
  }
});

// Route pour supprimer une équipe
router.delete('/delete-team/:id', auth, async (req, res) => {
  try {
    const teamId = req.params.id;  // ID de l'équipe à supprimer
    const userId = req.userId;  // ID de l'utilisateur qui fait la requête

    // Rechercher l'équipe par son ID
    const team = await Team.findById(teamId);

    // Vérifier si l'équipe existe et si l'utilisateur est bien le propriétaire de l'équipe
    if (!team) {
      return res.status(404).json({ message: 'Équipe non trouvée' });
    }

    if (team.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Accès refusé. Vous ne pouvez supprimer que vos propres équipes.' });
    }

    // Si tout est OK, supprimer l'équipe
    await Team.deleteOne({ _id: teamId });
    res.status(200).json({ message: 'Équipe supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipe:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'équipe', error });
  }
});

module.exports = router;
