const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// FAKE DATABASE (RAM)
// ========================
let clients = [];
let idCounter = 1;

// ========================
// TEST
// ========================
app.get("/", (req, res) => {
  res.send("Backend OK 🚀");
});

// ========================
// GET CLIENTS
// ========================
app.get("/clients", (req, res) => {
  res.json(clients);
});

// ========================
// ADD CLIENT
// ========================
app.post("/clients", (req, res) => {
  const { name, email, phone } = req.body;

  const newClient = {
    id: idCounter++,
    name,
    email,
    phone
  };

  clients.push(newClient);
  res.send("Client ajouté");
});

// ========================
// UPDATE CLIENT
// ========================
app.put("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;

  const client = clients.find(c => c.id === id);
  if (!client) return res.status(404).send("Client introuvable");

  client.name = name;
  client.email = email;
  client.phone = phone;

  res.send("Client modifié");
});

// ========================
// DELETE CLIENT
// ========================
app.delete("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  clients = clients.filter(c => c.id !== id);
  res.send("Client supprimé");
});

// ========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
