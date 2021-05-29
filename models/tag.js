const mongoose = require('mongoose');
const Joi = require('joi');
// Step 2 create Schema
const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    }
});
//Step 3 Create class/model
const Tag = mongoose.model('tag',tagSchema);


//Joi validation for UI
function validateTag(tag) {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });
    return schema.validate(tag);
  }

exports.Tag = Tag;
exports.validate = validateTag;
exports.tagSchema = tagSchema;