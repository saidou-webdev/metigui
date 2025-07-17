// server.js

require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const connection = require('./db'); // Connexion à la base de données

// Import des routes
const authRoutes = require('./routes/auth');
const entreprisesRoutes = require('./routes/entreprises');
const devisRoutes = require('./routes/devis');
const realisationsRoutes = require('./routes/realisations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Pour servir les fichiers statiques (images uploadées)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes API
app.use('/api', authRoutes);
app.use('/api/entreprises', entreprisesRoutes);
app.use('/api', devisRoutes);
app.use('/api/realisations', realisationsRoutes); // ✅ ici c'est bien séparé sous /realisations

// Route d'inscription client
app.post('/api/clientregister', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO client (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [firstName, lastName, email, hashedPassword], (error) => {
    if (error) {
      console.error("Erreur d'inscription client :", error);
      return res.status(500).json({ message: "Erreur serveur." });
    }
    res.status(201).json({ message: 'Client inscrit avec succès !' });
  });
});

// Route d'inscription entreprise
app.post('/api/businessregister', (req, res) => {
  const { name, email, password, sector, city, district, phone, yearsOfExperience, description } = req.body;

  if (!name || !email || !password || !sector || !city || !district || !phone || yearsOfExperience == null || !description) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `INSERT INTO entreprises (name, email, password, sector, city, district, phone, yearsOfExperience, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [name, email, hashedPassword, sector, city, district, phone, yearsOfExperience, description], (error) => {
    if (error) {
      console.error("Erreur d'inscription entreprise :", error);
      return res.status(500).json({ message: "Erreur serveur." });
    }
    res.status(201).json({ message: 'Votre entreprise a été inscrite avec succès !' });
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
