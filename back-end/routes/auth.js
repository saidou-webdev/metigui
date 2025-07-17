const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db'); // adapte le chemin si besoin

// Charge la clé secrète depuis .env ou fallback
const JWT_SECRET = process.env.JWT_SECRET || 'ta_clef_secrete_super_secrete';

router.post('/login', (req, res) => {
  const { identifier, password, userType } = req.body;

  if (!identifier || !password || !userType) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  let tableName = '';
  if (userType === 'client') {
    tableName = 'client';
  } else if (userType === 'professionnel') {
    tableName = 'entreprises';
  } else {
    return res.status(400).json({ message: 'Type d’utilisateur invalide' });
  }

  const sql = `SELECT * FROM ${tableName} WHERE email = ?`;
  connection.query(sql, [identifier], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Prépare les données pour le token
    const tokenPayload = {
      id: user.id,
      email: user.email,
      type: userType,
      name: user.name || `${user.firstName} ${user.lastName}`
    };

    // Génère le token JWT (valable 1h)
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: {
        id: user.id,
        name: user.name || `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: userType
      }
    });
  });
});

module.exports = router;
