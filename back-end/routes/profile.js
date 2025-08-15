// routes/profile.js
const express = require('express');
const router = express.Router();
const uploadProfile = require('../middlewares/uploadProfile');
const connection = require('../db');

// 📸 Upload photo profil entreprise
router.post('/upload/entreprise/:id', uploadProfile.single('profileImage'), (req, res) => {
  const entrepriseId = req.params.id;
  if (!req.file) {
    return res.status(400).json({ message: 'Aucune image fournie' });
  }
  const imagePath = `/uploads/profiles/${req.file.filename}`;
  const sql = `UPDATE entreprises SET profileImage = ? WHERE id = ?`;

  connection.query(sql, [imagePath, entrepriseId], (err) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la photo entreprise :", err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json({ message: 'Photo de profil entreprise mise à jour avec succès', imageUrl: imagePath });
  });
});

// 📸 Upload photo profil client
router.post('/upload/client/:id', uploadProfile.single('profileImage'), (req, res) => {
  const clientId = req.params.id;
  if (!req.file) {
    return res.status(400).json({ message: 'Aucune image fournie' });
  }
  const imagePath = `/uploads/profiles/${req.file.filename}`;
  const sql = `UPDATE client SET profileImage = ? WHERE id = ?`;

  connection.query(sql, [imagePath, clientId], (err) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la photo client :", err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json({ message: 'Photo de profil client mise à jour avec succès', imageUrl: imagePath });
  });
});

module.exports = router;
