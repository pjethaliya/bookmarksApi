const home = require('../routes/home');
const tags = require('../routes/tags');
const bookmarks = require('../routes/bookmarks');
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');

module.exports = function(app){
    //Middleware to read the json object from the requests
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(auth);
    //Routes
    app.use('/',home);
    app.use('/api/tags',tags);
    app.use('/api/bookmarks',bookmarks);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
}