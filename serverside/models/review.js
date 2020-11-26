const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
  const reviewSchema = new mongoose.Schema({
    username:  { type: String, required: true},
    bookTitle:  { type: String, required: true},
    rating:  { type: Number, required: true},
    comment:  { type: String, required: true},
  })
  

//use the blueprint to create the model 
// Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Review', reviewSchema,'bookReviews');
//note capital S in the collection name