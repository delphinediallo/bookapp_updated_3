const mongoose = require('mongoose');

const newsPostSchema = new mongoose.Schema ({
    postTitle: {type:String},
    postDate: {type:String},
    postAuthor: {type:String},
    postContent: {type:String}
});

module.exports = mongoose.model('newsPost', newsPostSchema, 'newsPost');