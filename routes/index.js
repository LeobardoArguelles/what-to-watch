var express = require('express');
var router = express.Router();
var path = require('path');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/html/', 'index.html'));
});

// POST suggestion to home page.
router.post('/', function(req, res) {
  console.log('POST');
});

module.exports = router;
