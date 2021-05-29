const express =  require('express');
const router = express.Router();
const {Users} = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
//Get the token if the user is valid
router.post('/',async(req,res)=>{
    const isValid = validate(req.body);
    if (isValid.error)  return res.status(400).send(result.error.details[0].message);

    let user = await Users.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');
    //Return JSON Web Token - JWT
    //const token = jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required(),
        password:Joi.string().required(),
      });
      return schema.validate(req);
}
module.exports = router;