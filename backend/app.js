// server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

app.get('/api/movie/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Received movie ID: ${id}`);
  res.json({ message: `Movie ID ${id} received successfully!` });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
