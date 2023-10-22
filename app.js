const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const libraryData = require('./data'); // Import data dari data.js

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint untuk menambahkan buku
app.post('/addBook', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  const newBook = { title, author };
  libraryData.push(newBook);
  res.json({ message: 'Buku berhasil ditambahkan', book: newBook });
});

// Endpoint untuk mendapatkan daftar buku
app.get('/getBooks', (req, res) => {
  res.json(libraryData);
});

// Endpoint untuk mengedit buku berdasarkan indeks
app.put('/editBook/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < libraryData.length) {
    const { title, author } = req.body;
    if (!title && !author) {
      return res.status(400).json({ error: 'Tidak ada data yang diubah' });
    }
    if (title) {
      libraryData[index].title = title;
    }
    if (author) {
      libraryData[index].author = author;
    }
    res.json({ message: 'Buku berhasil diubah', book: libraryData[index] });
  } else {
    res.status(404).json({ error: 'Buku tidak ditemukan' });
  }
});

// Endpoint untuk menghapus buku berdasarkan indeks
app.delete('/deleteBook/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < libraryData.length) {
    const deletedBook = libraryData.splice(index, 1);
    res.json({ message: 'Buku berhasil dihapus', book: deletedBook[0] });
  } else {
    res.status(404).json({ error: 'Buku tidak ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
