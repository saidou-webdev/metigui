const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

/** =====================================
 * ROUTE POST : Upload de nouvelles réalisations
 * ===================================== */
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

/** =====================================
 * ROUTE GET : Récupérer les réalisations
 * ===================================== */
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

/** =====================================
 * ROUTE PUT : Modifier une réalisation (image + description)
 * ===================================== */
router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const getOldSql = 'SELECT filename FROM realisations WHERE id = ?';
  connection.query(getOldSql, [id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(500).json({ message: 'Réalisation non trouvée ou erreur.' });
    }

    const oldFilename = rows[0].filename;

    // Si nouvelle image
    if (req.file) {
      const newFilename = req.file.filename;
      const updateSql = 'UPDATE realisations SET filename = ?, description = ? WHERE id = ?';

      connection.query(updateSql, [newFilename, description, id], (err2) => {
        if (err2) {
          console.error('Erreur update avec image :', err2);
          return res.status(500).json({ message: 'Erreur mise à jour.' });
        }

        // Supprimer ancienne image
        const oldPath = path.join('uploads/realisations', oldFilename);
        fs.unlink(oldPath, (unlinkErr) => {
          if (unlinkErr) console.warn('Ancienne image non supprimée :', unlinkErr.message);
        });

        res.status(200).json({ message: 'Réalisation mise à jour (image + description).' });
      });

    } else {
      // Mise à jour sans image
      const sql = 'UPDATE realisations SET description = ? WHERE id = ?';
      connection.query(sql, [description, id], (err3) => {
        if (err3) {
          console.error('Erreur update description :', err3);
          return res.status(500).json({ message: 'Erreur mise à jour.' });
        }

        res.status(200).json({ message: 'Réalisation mise à jour (description seule).' });
      });
    }
  });
});

/** =====================================
 * ROUTE DELETE : Supprimer une réalisation
 * ===================================== */
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Supprimer l’image d’abord
  const sqlGet = 'SELECT filename FROM realisations WHERE id = ?';
  connection.query(sqlGet, [id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ message: 'Erreur ou réalisation introuvable.' });
    }

    const imagePath = path.join('uploads/realisations', results[0].filename);
    fs.unlink(imagePath, (errUnlink) => {
      if (errUnlink) console.warn('Image non supprimée :', errUnlink.message);
    });

    // Supprimer la réalisation
    const sqlDelete = 'DELETE FROM realisations WHERE id = ?';
    connection.query(sqlDelete, [id], (err2) => {
      if (err2) {
        console.error('Erreur suppression réalisation:', err2);
        return res.status(500).json({ message: 'Erreur serveur lors de la suppression.' });
      }
      res.status(200).json({ message: 'Réalisation supprimée avec succès.' });
    });
  });
});

module.exports = router;
