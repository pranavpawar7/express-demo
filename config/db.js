const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'sql12.freesqldatabase.com',
    user:'sql12787731',
    password:'7lFYErHag7',
    database:'sql12787731',
    multipleStatements:true
});

// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'',
//     database:'basic_table',
//     multipleStatements:true
// });

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL Connected');
});

module.exports = db;