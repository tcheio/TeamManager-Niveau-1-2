const express = require('express');
const Member = require('../model/member');
const Team = require('../model/team');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/teams/:id/members', auth, async (req, res) => {
    try {
      const team = await Team.findById(req.params.id);
      if (!team || team.userId.toString() !== req.userId) {
        return res.status(403).json({ message: 'Accès refusé.' });
      }

      const members = await Member.find({ idTeam: req.params.id });
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des membres', error });
    }
  });

router.post('/teams/:id/add-member', auth, async (req, res) => {
  const { name } = req.body;

  try {
    const team = await Team.findById(req.params.id);
    if (!team || team.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }
    const member = new Member({ name, idTeam: req.params.id });
    await member.save();

    res.status(201).json({ message: 'Membre ajouté avec succès', member });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du membre', error });
  }
});
router.delete('/teams/:id/remove-member/:memberId', auth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team || team.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Accès refusé.' });
    }
    await Member.findByIdAndDelete(req.params.memberId);

    res.status(200).json({ message: 'Membre supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du membre', error });
  }
});

module.exports = router;
