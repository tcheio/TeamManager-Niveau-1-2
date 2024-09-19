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

router.post('/add-teams', auth, async (req, res) => {
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

router.delete('/teams/:id', auth, async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id, userId: req.userId });
    if (!team) {
      return res.status(404).json({ message: 'Équipe non trouvée ou accès refusé' });
    }

    await Team.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Équipe supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'équipe', error });
  }
});

module.exports = router;
