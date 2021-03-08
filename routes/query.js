var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const db_pass = process.env.PASS;

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: db_pass,
  database: 'movies'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    console.log(err);
    return;
  }
  console.log('Connection established with DB');
});

/* GET users listing. */
router.get('/:movie_name', function(req, res, next) {
  getSuggestion(req.params['movie_name'], res);
});

function sendResponse(res, data) {
  res.send(data);
}

function getSuggestion(movie_name, response) {
  movie = mysqlEscape(movie_name)
  let movies = con.query('SELECT name FROM movies WHERE name LIKE "' + movie + '%" ORDER BY release_year DESC LIMIT 5', (err,rows) => {
    if(err) throw err;
    let movies = []
    rows.forEach( (row) => {
      movies.push(row.name);
    });
    sendResponse(response, movies);
  });
  return movies;
}

function mysqlEscape(stringToEscape){
  return stringToEscape
      .replace("\\", "\\\\")
      .replace("\'", "\\\'")
      .replace("\"", "\\\"")
      .replace("\n", "\\\n")
      .replace("\r", "\\\r")
      .replace("\x00", "\\\x00")
      .replace("\x1a", "\\\x1a");
}

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all remaining queries are executed
//   // Then sends a quit packet to the MySQL server.
// });

module.exports = router;
