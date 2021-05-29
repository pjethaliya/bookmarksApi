const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
//1. Create a UserSchema for mongo
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength:5,
        maxlength:255
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});
UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},'jwtPrivateKey');
    return token;
}
//2. Create a Class 
const Users = mongoose.model('Users',UserSchema);

//Joi validation for UI
function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().required(),
        password:Joi.string().required(),
      });
      return schema.validate(user);
}
exports.Users = Users;
exports.validate = validateUser;
