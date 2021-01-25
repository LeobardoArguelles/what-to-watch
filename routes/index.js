var express = require('express');
var router = express.Router();
var path = require('path');
require('dotenv').config();
const root = 'https://api.themoviedb.org/3/search/movie?api_key=';
const key = process.env.KEY;
const language = '&language=en-US';


/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/html/', 'index.html'));
});

// POST suggestion to home page.
router.post('/', function(req, res) {
  
  console.log(req.body);
  res.sendFile(path.join(__dirname, '../views/html/', 'index.html'));
});

module.exports = router;
