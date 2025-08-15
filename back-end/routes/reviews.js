// routes/reviews.js
const express = require('express');
const router = express.Router();
const connection = require('../db');

// Fonction utilitaire pour les requêtes SQL avec Promises
const query = (sql, params = []) =>
  new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

// Ajouter un avis avec création de notification
router.post('/', async (req, res) => {
  const { businessId, clientId, rating, comment } = req.body;

  if (!businessId || !clientId || !rating) {
    return res.status(400).json({ error: 'businessId, clientId et rating sont obligatoires.' });
  }

  try {
    // 1. Insérer l'avis
    const sqlReview = `INSERT INTO reviews (business_id, client_id, rating, comment) VALUES (?, ?, ?, ?)`;
    const result = await query(sqlReview, [businessId, clientId, rating, comment || null]);

    // 2. Créer la notification liée à l'avis
    const newReviewId = result.insertId;

    const sqlNotif = `
      INSERT INTO notifications (business_id, type, message, link, is_read, created_at)
      VALUES (?, 'avis', 'Vous avez reçu un nouvel avis.', ?, 0, NOW())
    `;

    // Par exemple, le lien peut pointer vers la page des avis de l'entreprise
    const link = `/business/${businessId}/reviews`;

    await query(sqlNotif, [businessId, link]);

    res.status(201).json({ message: 'Avis ajouté avec succès', reviewId: newReviewId });
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'avis :', err);
    res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de l\'avis.' });
  }
});

module.exports = router;
