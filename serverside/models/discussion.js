const mongoose = require('mongoose');

const discussionPostSchema = new mongoose.Schema({
          username: {type:String},
          postn: {type:String},
          bookn: {type:String},
          post: {type:String},
          read: {type:Boolean}
});

module.exports = mongoose.model('discussions', discussionPostSchema, 'discussions');