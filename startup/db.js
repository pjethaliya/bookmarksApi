const mongoose = require('mongoose');
module.exports  = function(){
    //Connect to MongoDB - Step 1 Mongo
    mongoose.connect('mongodb://localhost/bookmarks')
    .then(()=>console.log('Connected to MongoDB...'))
}