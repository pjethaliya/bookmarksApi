const mongoose = require('mongoose');
const Joi = require('joi');
const { tagSchema } = require('./tag');

const BookmarkSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlenght:5,
        maxlength:255,
        trim:true
    },
    link:{
        type:String,
        required:true
    },
    tag:{
        type: tagSchema,
        required:true
    }
});

const Bookmark = mongoose.model('Bookmark',BookmarkSchema);

//Joi validation for UI
function validateBookmark(bookmark) {
    const schema = Joi.object({
      title: Joi.string().min(5).required(),
      link: Joi.string().required(),
      tagId: Joi.string().required(),
    });
    return schema.validate(bookmark);
  }

exports.Bookmark = Bookmark;
exports.validate = validateBookmark;