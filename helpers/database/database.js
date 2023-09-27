const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite'
});

const Question = sequelize.define('Question', {
  title: DataTypes.STRING,
  content: DataTypes.STRING,
});

sequelize.sync()

module.exports = {
  Question
}

// var sqlite3 = require('sqlite3').verbose()
// // var md5 = require('md5')

// const DBSOURCE = "db.sqlite"

// const db = new sqlite3.Database(DBSOURCE, (err) => {
//   if (err) {
//     // Cannot open database
//     console.error(err.message)
//     throw err
//   } else {
//     console.log('Connected to the SQLite database.')
//     db.run(`CREATE TABLE question (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             title text,
//             content text
//             )`,
//       (err) => {
//         if (err) {
//           // Table already created
//           console.log('Table already created')
//         } else {
//           // Table just created, creating some rows
//           const insert = 'INSERT INTO question (title, content) VALUES (?,?)'
//           db.run(insert, ["test", "test1212"], function (err) {
//             console.log('err:', err)
//             console.log('this:', this)
//           })
//         }
//       });
//   }
// });


// module.exports = {
//   db
// }