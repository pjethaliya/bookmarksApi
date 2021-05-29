const express =  require('express');
const router = express.Router();
const {Users,validate} = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

router.get('/me', auth, async(req,res)=>{
     const user = await Users.findById(req.user._id).select('-password');
     res.send(user);
});
//Create new user and send the token back
router.post('/',async(req,res)=>{
    const isValid = validate(req.body);
    if (isValid.error)  return res.status(400).send(result.error.details[0].message);

    let user = await Users.findOne({email:req.body.email});
    if(user) return res.status(400).send('user already exists');

    user = new Users(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)
    user = await user.save()

    const token = user.generateAuthToken();
    
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});
module.exports = router;