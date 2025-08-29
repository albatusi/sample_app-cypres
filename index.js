const express = require('express');
const path = require('path');
const app = express();
const PORT = 5050;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.redirect('/dashboard');
  }
  res.status(401).send('Credenciales inválidas');
});

app.get('/dashboard', (req, res) => {
  res.send('<h1>Bienvenido al dashboard</h1>');
});

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
