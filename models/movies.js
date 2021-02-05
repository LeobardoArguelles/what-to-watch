var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MovieSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
  }
);

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
