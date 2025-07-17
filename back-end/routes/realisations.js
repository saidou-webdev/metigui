const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connection = require('../db');

// Configuration de stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/realisations/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

// Filtre : autoriser uniquement les images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isExtValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isMimeValid = allowedTypes.test(file.mimetype);
  if (isExtValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images (jpeg, jpg, png, gif) sont autorisées.'));
  }
};

const upload = multer({ storage, fileFilter });

// ✅ ROUTE POST pour uploader des réalisations
router.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const businessId = parseInt(req.body.businessId);
    const description = req.body.description || '';

    if (!businessId) {
      return res.status(400).json({ message: 'businessId est requis.' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Aucune image reçue.' });
    }

    const values = req.files.map(file => [
      businessId,
      file.filename,
      description,
      new Date()
    ]);

    const sql = `INSERT INTO realisations (business_id, filename, description, created_at) VALUES ?`;

    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Erreur insertion réalisations :', err);
        return res.status(500).json({ message: 'Erreur lors de l’enregistrement en base.' });
      }

      res.status(201).json({ message: 'Images téléchargées et enregistrées avec succès !' });
    });
  } catch (err) {
    console.error('Erreur upload :', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});

// ✅ ROUTE GET pour récupérer les réalisations
router.get('/business/:id', (req, res) => {
  const businessId = parseInt(req.params.id);

  const sql = 'SELECT * FROM realisations WHERE business_id = ? ORDER BY created_at DESC';

  connection.query(sql, [businessId], (err, results) => {
    if (err) {
      console.error('Erreur récupération réalisations :', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la récupération des réalisations.' });
    }

    const resultsWithUrl = results.map(row => ({
      ...row,
      imageUrl: `http://localhost:5000/uploads/realisations/${row.filename}`
    }));

    res.status(200).json(resultsWithUrl);
  });
});


// Modifier une réalisation (PUT)
router.put('/realisations/:id', (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const sql = 'UPDATE realisations SET description = ? WHERE id = ?';
  connection.query(sql, [description, id], (err, result) => {
    if (err) {
      console.error('Erreur mise à jour réalisation:', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la mise à jour.' });
    }
    res.status(200).json({ message: 'Réalisation mise à jour avec succès.' });
  });
});

// Supprimer une réalisation (DELETE)
router.delete('/realisations/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM realisations WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Erreur suppression réalisation:', err);
      return res.status(500).json({ message: 'Erreur serveur lors de la suppression.' });
    }
    res.status(200).json({ message: 'Réalisation supprimée avec succès.' });
  });
});

module.exports = router;
