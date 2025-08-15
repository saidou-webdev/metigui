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

// 📌 Récupérer une entreprise par son ID avec ses avis et la note moyenne
router.get('/:id', (req, res) => {
  const businessId = req.params.id;

  // Requête pour récupérer l'entreprise
  const sqlBusiness = 'SELECT * FROM entreprises WHERE id = ?';

  connection.query(sqlBusiness, [businessId], (err, businessResults) => {
    if (err) {
      console.error('Erreur lors de la récupération de l\'entreprise :', err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (businessResults.length === 0) {
      return res.status(404).json({ message: "Entreprise non trouvée" });
    }

    const business = businessResults[0];

    // Requête pour récupérer les avis avec nom client
    const sqlReviews = `
      SELECT r.*, c.firstName AS clientFirstName, c.lastName AS clientLastName
      FROM reviews r
      JOIN client c ON r.client_id = c.id
      WHERE r.business_id = ?
      ORDER BY r.created_at DESC
    `;

    connection.query(sqlReviews, [businessId], (err2, reviewsResults) => {
      if (err2) {
        console.error('Erreur lors de la récupération des avis :', err2);
        return res.status(500).json({ message: "Erreur serveur" });
      }

      // Calcul de la note moyenne
      const avgRating = reviewsResults.length
        ? reviewsResults.reduce((sum, r) => sum + r.rating, 0) / reviewsResults.length
        : null;

      // Formatage des avis avec le nom complet du client
      const reviews = reviewsResults.map(r => ({
        ...r,
        clientName: `${r.clientFirstName} ${r.clientLastName}`,
      }));

      // Ajout des avis et note moyenne à l'objet business
      business.reviews = reviews;
      business.rating = avgRating;

      res.status(200).json(business);
    });
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
