const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let clients = [];
let idCounter = 1;

// Test
app.get("/", (req, res) => {
  res.send("Backend OK 🚀");
});

// GET clients
app.get("/clients", (req, res) => {
  res.json(clients);
});

// POST client
app.post("/clients", (req, res) => {
  const client = {
    id: idCounter++,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };

  clients.push(client);
  res.send("Client ajouté");
});

// PUT client
app.put("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const client = clients.find(c => c.id === id);
  if (!client) return res.status(404).send("Client introuvable");

  client.name = req.body.name;
  client.email = req.body.email;
  client.phone = req.body.phone;

  res.send("Client modifié");
});

// DELETE client
app.delete("/clients/:id", (req, res) => {
  const id = parseInt(req.params.id);
  clients = clients.filter(c => c.id !== id);
  res.send("Client supprimé");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
