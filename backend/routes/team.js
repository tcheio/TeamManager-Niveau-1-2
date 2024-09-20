const express = require('express');
const Team = require('../model/team');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/teams', auth, async (req, res) => {
  try {
    const teams = await Team.find({ userId: req.userId });
    res.json(teams);
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


router.delete('/delete-team/:id', auth, async (req, res) => {
  try {
    const teamId = req.params.id;
    const userId = req.userId;  

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: 'Équipe non trouvée' });
    }

    if (team.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Accès refusé. Vous ne pouvez supprimer que vos propres équipes.' });
    }

    await Team.deleteOne({ _id: teamId });
    res.status(200).json({ message: 'Équipe supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'équipe:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'équipe', error });
  }
});

router.get('/teams/:id', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team || team.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'équipe' });
  }
});

// Route pour modifier une équipe
router.put('/teams/:id', auth, async (req, res) => {
  const { name, description, members } = req.body;

  try {
    // Trouver l'équipe par ID et vérifier si l'utilisateur a les droits
    const team = await Team.findById(req.params.id);
    if (!team || team.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }

    // Mettre à jour le nom, la description et les membres si fournis
    if (name) team.name = name;
    if (description) team.description = description;
    if (members) team.members = members;

    await team.save();
    res.json({ message: 'Équipe mise à jour avec succès', team });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'équipe', error });
  }
});

module.exports = router;
