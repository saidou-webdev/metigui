
const express = require('express');
const router = express.Router();
const connection = require('../db');

// 📌 Récupérer toutes les entreprises
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM entreprises';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des entreprises :', err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json(results);
  });
});

// 📌 Récupérer une entreprise par son ID
router.get('/:id', (req, res) => {
  const businessId = req.params.id;
  const sql = 'SELECT * FROM entreprises WHERE id = ?';
  connection.query(sql, [businessId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'entreprise :', err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Entreprise non trouvée" });
    }
    res.status(200).json(results[0]);
  });
});

// 📌 Mettre à jour une entreprise par ID
router.put('/:id', (req, res) => {
  const businessId = req.params.id;
  const {
    name,
    email,
    sector,
    phone,
    yearsOfExperience,
    description,
    location = {}
  } = req.body;

  const { city, district } = location;

  const sql = `
    UPDATE entreprises 
    SET name = ?, email = ?, sector = ?, phone = ?, yearsOfExperience = ?, description = ?, city = ?, district = ? 
    WHERE id = ?
  `;

  connection.query(
    sql,
    [name, email, sector, phone, yearsOfExperience, description, city, district, businessId],
    (err, result) => {
      if (err) {
        console.error('Erreur lors de la mise à jour de l\'entreprise :', err);
        return res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
      }

      // Revenir les nouvelles infos après mise à jour
      const updatedBusiness = {
        id: businessId,
        name,
        email,
        sector,
        phone,
        yearsOfExperience,
        description,
        location: { city, district }
      };

      res.status(200).json(updatedBusiness);
    }
  );
});


module.exports = router;
