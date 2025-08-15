const express = require('express');
const router = express.Router();
const connection = require('../db');

// Récupérer les notifications non lues d'une entreprise
router.get('/:businessId', (req, res) => {
  const businessId = req.params.businessId;
  const sql = `SELECT * FROM notifications WHERE business_id = ? AND is_read = FALSE ORDER BY created_at DESC`;
  connection.query(sql, [businessId], (err, results) => {
    if (err) {
      console.error("Erreur récupération notifications :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.json(results);
  });
});

// Marquer une notification comme lue
router.put('/read/:notificationId', (req, res) => {
  const notificationId = req.params.notificationId;
  const sql = `UPDATE notifications SET is_read = TRUE WHERE id = ?`;
  connection.query(sql, [notificationId], (err, result) => {
    if (err) {
      console.error("Erreur mise à jour notification :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.json({ message: "Notification marquée comme lue" });
  });
});


// Supprimer les notifications expirées (plus vieilles que 30 jours) pour une entreprise
router.delete('/cleanup/:businessId', (req, res) => {
    const businessId = req.params.businessId;
    const sql = `
      DELETE FROM notifications
      WHERE business_id = ? AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
    `;
  
    connection.query(sql, [businessId], (err, result) => {
      if (err) {
        console.error("Erreur lors du nettoyage des notifications :", err);
        return res.status(500).json({ message: "Erreur serveur" });
      }
  
      res.json({ message: `Notifications expirées supprimées avec succès (${result.affectedRows} supprimées)` });
    });
  });
  

module.exports = router;
