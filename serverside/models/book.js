const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema ({
          title: {type:String},
          author: {type:String},
          year: {type:String},
          genre: {type:String}
        });
    
module.exports = mongoose.model('books', bookSchema, 'books');