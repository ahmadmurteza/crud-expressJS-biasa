const mysql = require('mysql');
// Koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list-app'
});

conn.connect((err) => {
    if (err) {
        console.log('Koneksi eror: ' + err.stack);
        return;
    }

    console.log('Success');
});
// akhir koneksi

module.exports = conn;