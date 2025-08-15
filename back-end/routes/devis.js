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

/** 🚀 1. Créer un nouveau devis */
router.post('/devis', async (req, res) => {
  try {
    const {
      clientId,
      businessId,
      message,
      clientName,
      clientEmail,
      clientPhone,
      clientCity,
    } = req.body;

    if (!clientId || !businessId || !message || !clientName || !clientEmail || !clientPhone) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // 1. Insérer le devis
    const sqlDevis = `
      INSERT INTO devis (
        clientId, businessId, description,
        clientName, clientEmail, clientPhone, clientCity,
        status, createdAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;
    const valuesDevis = [clientId, businessId, message, clientName, clientEmail, clientPhone, clientCity || null];

    const result = await query(sqlDevis, valuesDevis);

   // 2. Créer la notification liée au devis
const newDevisId = result.insertId;

const sqlNotif = `
  INSERT INTO notifications (business_id, type, message, link, is_read, created_at)
  VALUES (?, 'devis', 'Vous avez reçu un nouveau devis.', ?, 0, NOW())
`;

// Par exemple, un lien vers la page du devis côté front (à adapter si besoin)
const link = `/business/devis/${newDevisId}`;

await query(sqlNotif, [businessId, link]);


    res.status(201).json({ message: "✅ Demande de devis envoyée avec succès !" });
  } catch (err) {
    console.error("❌ Erreur lors de la création du devis :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});


/** 📄 2. Obtenir les devis d'un client ou d'une entreprise */
router.get('/devis', async (req, res) => {
  try {
    const { clientId, businessId } = req.query;

    if (!clientId && !businessId) {
      return res.status(400).json({ message: "clientId ou businessId est requis." });
    }

    const sql = clientId
      ? 'SELECT * FROM devis WHERE clientId = ? ORDER BY createdAt DESC'
      : 'SELECT * FROM devis WHERE businessId = ? ORDER BY createdAt DESC';

    const results = await query(sql, [clientId || businessId]);
    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Erreur récupération devis :', err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

/** 🔄 3. Mettre à jour le statut d’un devis */
router.patch('/devis/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['responded', 'refused', 'cancelled'];
    if (!status || typeof status !== 'string' || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Statut invalide.' });
    }

    const sql = 'UPDATE devis SET status = ? WHERE id = ?';
    const result = await query(sql, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Devis non trouvé.' });
    }

    let message = '';
    switch (status) {
      case 'responded':
        message = '✅ Le devis a été répondu.';
        break;
      case 'refused':
        message = '❌ Le devis a été refusé.';
        break;
      case 'cancelled':
        message = '🛑 Le devis a été annulé.';
        break;
    }

    res.status(200).json({ message });
  } catch (err) {
    console.error('❌ Erreur MAJ statut devis :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

/** ➕ 4. Répondre à un devis avec des lignes */
router.post('/devis/:id/lignes', async (req, res) => {
  try {
    const devisId = parseInt(req.params.id);
    const lignes = req.body.lignes;

    if (!Array.isArray(lignes) || lignes.length === 0) {
      return res.status(400).json({ message: "Aucune ligne de devis reçue." });
    }

    await query('DELETE FROM ligne_devis WHERE devis_id = ?', [devisId]);

    const placeholders = lignes.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const values = lignes.flatMap(ligne => [
      devisId,
      ligne.designation,
      ligne.quantite,
      ligne.prix_unitaire,
      ligne.prix_total,
    ]);

    await query(
      `INSERT INTO ligne_devis (devis_id, designation, quantite, prix_unitaire, prix_total) VALUES ${placeholders}`,
      values
    );

    await query('UPDATE devis SET status = ? WHERE id = ?', ['responded', devisId]);

    res.status(201).json({ message: "✅ Réponse au devis enregistrée avec succès." });
  } catch (err) {
    console.error("❌ Erreur insertion lignes devis :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

/** 👀 5. Obtenir les lignes d’un devis (côté client) */
router.get('/devis/:id/lignes', async (req, res) => {
  try {
    const devisId = parseInt(req.params.id);

    const sql = `
      SELECT designation, quantite, prix_unitaire, prix_total
      FROM ligne_devis
      WHERE devis_id = ?
    `;
    const result = await query(sql, [devisId]);

    res.status(200).json(result);
  } catch (err) {
    console.error('❌ Erreur récupération lignes devis :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

module.exports = router;
