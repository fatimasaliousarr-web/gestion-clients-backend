const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MYSQL",
  database: "gestion_clients"
});

// Tester connexion
db.connect((err) => {
  if (err) {
    console.log("Erreur MySQL ❌", err);
  } else {
    console.log("Connecté à MySQL ✅");
  }
});

// Route test
app.get("/", (req, res) => {
  res.send("Backend + MySQL OK");
});

// Ajouter client
app.post("/clients", (req, res) => {
  const { name, email, phone } = req.body;

  const sql = "INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [name, email, phone], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Client ajouté");
  });
});

// Liste clients
app.get("/clients", (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
app.get("/clients", (req, res) => {
  db.query("SELECT * FROM clients", (err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});
app.post("/clients", (req, res) => {
  const { name, email, phone } = req.body;

  const sql = "INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)";
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "Client ajouté" });
    }
  });
});


// Lancement serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
