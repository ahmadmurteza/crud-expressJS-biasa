const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./connection');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    conn.query(
        'SELECT * FROM mahasiswa',
        (error, results) => {
            if (error) throw error;
            res.render('index.ejs', { students: results });
        }
    );
});

app.get('/list', (req, res) => {
    conn.query(
        'SELECT * FROM mahasiswa',
        (error, results) => {
            if (error) throw error;
            res.render('list.ejs', { students: results });
        }
    );

});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.post('/create', (req, res) => {
    let sql = 'INSERT INTO mahasiswa(nama, jurusan, nHarian, nUts, nUas) VALUES(?, ?, ?, ?, ?)';
    let data = [req.body.nama, req.body.jurusan, req.body.nHarian, req.body.nUts, req.body.nUas];
    conn.query(sql, data, (error, results) => {
        if (error) throw error;
        console.log('Menginput Data');
        res.redirect('/list');
    });
});

app.get('/edit/:id', (req, res) => {
    let sql = 'SELECT * FROM mahasiswa WHERE id = ?';
    let params = [req.params.id];
    conn.query(sql, params, (error, results) => {
        if (error) throw error;
        console.log('Kehalaman edit');
        res.render('edit.ejs', { student: results[0] });
    });
});

app.post('/update/:id', (req, res) => {
    let sql = 'UPDATE mahasiswa SET nama = ?, jurusan = ?, nHarian = ?, nUts = ?, nUas = ? WHERE id = ?';
    let data = [req.body.nama, req.body.jurusan, req.body.nHarian, req.body.nUts, req.body.nUas, req.params.id];
    conn.query(sql, data, (error, results) => {
        if (error) throw error;
        console.log('Mengupdate data');
        res.redirect('/list');
    });
});

app.post('/delete/:id', (req, res) => {
    let sql = 'DELETE FROM mahasiswa WHERE id = ?';
    let params = [req.params.id];
    conn.query(sql, params, (error, results) => {
        if (error) throw error;
        console.log('Menghapus data');
        res.redirect('/list');
    });
});

app.listen(3000);