const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//required models
const newsPost = require('./models/newsPost');
const discussionPost = require('./models/discussion');
const bookModel = require('./models/book');
const Review = require('./models/review')

const { hasLifecycleHook } = require('@angular/compiler/src/lifecycle_reflector');
const connectionString = 'mongodb+srv://admin:VERify45@cluster0.cqyls.azure.mongodb.net/book-app?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log('Mongo db connected');})
    .catch(() => {console.log('Mongo db connection error');});

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); //allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

//parse application/json
app.use(bodyParser.json());

//retrieve all news posts from db
app.get('/news', (req,res,next) => {
    newsPost.find().sort('-postDate')
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});

//retrieve all discussion posts from db
app.get('/discussions', (req,res,next) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    discussionPost.find(condition)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});

//retrieve all books from db
app.get('/books', (req,res,next) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    bookModel.find(condition)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});

//retrieve all reviews from db
app.get('/reviews', (req, res, next) => {
   //call mongoose method find (MongoDB db.Review.find())
   Review.find()
      //if data is returned, send data as a response 
      .then(data => res.status(200).json(data))
      //if error, send internal server error
      .catch(err => {
         console.log('Error: ${err}');
         res.status(500).json(err);
      });
});

//retrieve a single news post
app.get('/news/:id', (req,res,next) => {
    newsPost.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});

//retrieve a single book
app.get('/books/:id', (req,res,next) => {
    bookModel.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});

//retrieve a single discussion
app.get('/discussions/:id', (req,res,next) => {
    discussionPost.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});


//retrieve a single news post for editing
app.get('/news/edit/:id', (req,res,next) => {
    newsPost.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {
        console.log('Error: $(err)');
        res.status(500).json(err);
    });
});

//retrieve a single discussion post for editing
app.get('/discussions/edit/:id', (req,res,next) => {
  discussionPost.findById(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => {
      console.log('Error: $(err)');
      res.status(500).json(err);
  });
});

//add a new news post
app.post('/news/add', (req,res,next) => {
    //create newsPost variable and save request's fields to db
    const post = new newsPost ({
        postTitle: req.body.postTitle,
        postDate: req.body.postDate,
        postAuthor: req.body.postAuthor,
        postContent: req.body.postContent
    });
    post.save()
    //in case of success
    .then(() => { console.log('post saved to db'); })
    //in case of error
    .catch(() => { console.log('error: ' + err); });
});

//create and save a new discussion
app.post('/discussions/add', (req,res,next) => {
    //create discussionPost variable and save request's fields to db
    const discussion = new discussionPost({
        username: req.body.username,
        postn: req.body.postn,
        bookn: req.body.bookn,
        post: req.body.post,
        read: req.body.read ? req.body.read : false
      });
    discussion.save()
    //in case of success
    .then(() => { console.log('discussion saved to db'); })
    //in case of error
    .catch(() => { console.log('error: ' + err); });
});

//create and save a new book
app.post('/books/add', (req,res,next) => {
    //create book variable and save request's fields to db
    const book = new bookModel({
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre
    });
    book.save()
    //in case of success
    .then(() => { console.log('book saved to db'); })
    //in case of error
    .catch(() => { console.log('error: ' + err); });
});

//create and save new review
// serve incoming post requests to /reviews
app.post('/reviews', (req, res, next) => {
  // create a new review variable and save request’s fields 
  const review = new Review({
   username: req.body.username,
   bookTitle: req.body.bookTitle,
   rating: req.body.rating,
   comment: req.body.comment
   
 });
 //send the document to the database 
 review.save()
   //in case of success
   .then(() => { console.log('Success');})
   //if error
   .catch(err => {console.log('Error:' + err);});

});

//update a news post
app.put('/news/edit/:id', (req,res,next) => {
    console.log('id: ' + req.params.id)
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            //find document and set new values
            newsPost.findOneAndUpdate(
                {_id: req.params.id},
                {$set: {postTitle: req.body.postTitle,
                    postDate: req.body.postDate,
                    postAuthor: req.body.postAuthor,
                    postContent: req.body.postContent}},
                {new:true})
            .then((news) => {
                if(news) {
                    console.log(news);
                }
                else {
                    console.log('no data exists');
                }
                })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            console.log('please provide correct id');
        }
});

//update a review
 // serve incoming put requests to /students
 app.put('/reviews/:id', (req, res, next) => {
   console.log("id: " + req.params.id)
   // check that the parameter id is valid 
   if (mongoose.Types.ObjectId.isValid(req.params.id)) {
     //find a document and set new first and last names
     Review.findOneAndUpdate({_id: req.params.id},
       {$set:{username : req.body.username,
         bookTitle : req.body.bookTitle, 
         rating : req.body.rating ,
         comment : req.body.comment}},{new:true}) 
      .then((review) => {
         if (review) { //what was updated
           console.log(review);
         } else {
           console.log("no data exist for this id");
         }
      })
     .catch((err) => {
       console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
   
 });  


//update a book
app.put('/books/:id', (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      bookModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }) //changed from Tutorial
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Book with id=${id}.`
            });
          } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Book with id=" + id
          });
        });
});

//update a discussion post
app.put('/discussions/:id', (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  discussionPost.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update discussion post with id=${id}. Maybe discussion post was not found!`
        });
      } else res.send({ message: "Discussion post was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating discussion post with id: " + id
      });
    });
});

//delete one news post
app.delete('/news/:id', (req,res,next) => {
    newsPost.deleteOne({_id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json('deleted!');
    });
});

//delete one review
//:id is a dynamic parameter that will be extracted from the URL
app.delete("/reviews/:id", (req, res, next) => {
  Review.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

//delete all books
app.delete("/books", (req, res, next) => {
  bookModel.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Books were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all books."
    });
  });
});

//delete one book
app.delete("/books/:id", (req, res, next) => {
    const id = req.params.id;
  
    bookModel.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Book with id=${id}.`
          });
        } else {
          res.send({
            message: "Book was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
});

//delete all discussions
app.delete("/discussions", (req, res, next) => {
  discussionPost.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Discussions were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all discussions."
    });
  });
});

//delete one discussion
app.delete("/discussions/:id", (req, res, next) => {
  const id = req.params.id;

  discussionPost.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete discussion post with id=${id}. Maybe discussion post was not found!`
        });
      } else {
        res.send({
          message: "Discussion post was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete discussion post with id=" + id
      });
    });
});


//to use this middleware in other parts of the application
module.exports = app;